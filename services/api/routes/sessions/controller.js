const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');
const emissions = require('../../utils/emissions');
const vinDecoder = require('../../utils/vin');

exports.startSession = async (req, res) => {
    try {
        // Leggi email dal token e vin dalla query string
        const email = req.userToken.email;
        const vin = req.params.vin;

        // Validazione email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid or missing email in token' });
        }

        // Validazione VIN
        if (!vin || vin.length !== 17) {
            return res.status(400).json({ error: 'Invalid VIN length. VIN must be 17 characters long.' });
        }

        // Verifica esistenza utente
        const user = await prisma.cittadini.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verifica se la vettura esiste ed è legata all'utente
        const car = await prisma.vetture.findFirst({
            where: {
                vin: vin,
                proprietario: email
            }
        });

        if (!car) {
            return res.status(404).json({ error: 'Car not found or does not belong to the user' });
        }

        // Crea sessione collegandola alla vettura esistente
        const sessione = await prisma.sessioni.create({
            data: {
                km: 0,
                co2: 0,
                vetture: {
                    connect: {
                        vin: req.params.vin
                    }
                },
                inizio: BigInt(Math.floor(Date.now() / 1000))
            }
        })

        res.status(201).json({ message: 'Session started', sessionId: sessione.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.endSession = async (req, res) => {
    try {
        // Leggi email dal token, id dalla path e km dal body
        const email = req.userToken.email;
        const sessioneId = parseInt(req.params.id);
        const { km } = req.body;

        // Validazione email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid or missing email in token' });
        }

        // Validazione id
        if (!sessioneId || isNaN(sessioneId)) {
            return res.status(400).json({ error: 'Invalid session id' });
        }

        // Validazione km
        if (typeof km !== 'number' || isNaN(km) || km < 0) {
            return res.status(400).json({ error: 'Invalid km value' });
        }

        // Verifica esistenza utente
        const user = await prisma.cittadini.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verifica esistenza sessione associata all'utente
        const sessione = await prisma.sessioni.findFirst({
            where: {
                id: sessioneId,
                vetture: {
                    proprietario: email
                }
            },
            include: {
                vetture: true
            }
        });
        if (!sessione) {
            return res.status(404).json({ error: 'Session not found or not associated with user' });
        }

        // Calcolo emissioni
        let co2 = 0;
        let pm = 0;


        // Decodifica VIN per ottenere l'anno
        const carInfo = vinDecoder.getVIN(sessione.vetture.vin);
        
        if (carInfo && carInfo.modelYear) {
            const co2PerKm = emissions.co2PerKm(carInfo.modelYear);
            const pmPerKm = emissions.pmPerKm(carInfo.modelYear);
            
            // Calcolo totali
            co2 = co2PerKm * km;
            pm = pmPerKm * km;
        }

        // Aggiorna i dati della sessione
        await prisma.sessioni.update({
            where: { id: sessioneId },
            data: { km, co2, pm }
        });

        res.status(200).json({ message: 'Session ended and km updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



const protobuf = require('protobufjs');
const path = require('path');

exports.sendReadings = async (req, res) => {
    try {
        let data;
        const contentType = req.headers['content-type'];
        if (contentType === 'application/x-protobuf') {
            // Carica dinamicamente il .proto
            const protoPath = path.join(__dirname, '../../../../proto/api/v1/drive_data.proto');
            const root = await protobuf.load(protoPath);
            const DriveDataPoint = root.lookupType('colombo.api.v1.DriveDataPoint');
            // Buffer dal body
            const buffer = req.body instanceof Buffer ? req.body : Buffer.from(req.body);
            const message = DriveDataPoint.decode(buffer);
            data = DriveDataPoint.toObject(message, { enums: String, longs: Number, defaults: true });
        } else if (contentType && contentType.includes('application/json')) {
            data = req.body;
        } else {
            return res.status(415).json({ error: 'Unsupported content-type' });
        }

        // Validazione base (puoi aggiungere controlli specifici)
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        // TODO: Salvataggio dati su DB (usando prisma, come per le altre funzioni)

        res.status(200).json({ message: 'Dati ricevuti correttamente', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.downloadReadings = async (req, res) => {
    try {
        // Leggi email dal token e vin dalla query string
        const email = req.userToken.email;
        const sessioneId = parseInt(req.params.id);

        // Validazione email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid or missing email in token' });
        }

        // Validazione id
        if (!sessioneId || isNaN(sessioneId)) {
            return res.status(400).json({ error: 'Invalid session or id length' });
        }

        // Verifica esistenza utente
        const user = await prisma.cittadini.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Trova l'ultima sessione per questa vettura
        const sessione = await prisma.sessioni.findFirst({
            where: {
                id: sessioneId
            },
            orderBy: {
                id: 'desc'
            }
        });

        if (!sessione) {
            return res.status(200).json({ message: 'Nessuna rilevazione per questa sessione (sessione vuota o eliminata)' });
        }

        // Scarica le rilevazioni
        const rilevazioni = await prisma.$queryRaw`
                SELECT ST_AsGeoJSON(punto) as punto, punteggio
                FROM rilevazioni
                WHERE sessione = ${sessione.id}
            `;

        if (rilevazioni.length === 0) {
            return res.status(200).json({ message: 'Nessuna rilevazione per questa sessione (sessione vuota o eliminata)' });
        }

        // Il campo 'punto' è una stringa GeoJSON, quindi la parsifichiamo
        const processedRilevazioni = rilevazioni.map(r => ({
            ...r,
            punto: JSON.parse(r.punto)
        }));

        res.status(200).json({
            message: "Rilevazioni scaricate con successo",
            sessionId: sessione.id,
            rilevazioni: processedRilevazioni
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}