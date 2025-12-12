const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');


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
                }
            }
        })

        res.status(201).json({ message: 'Session started', sessionId: sessione.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.sendReadings = async (req, res) => {
    try {
        res.status(200).json({ message: 'Dummy return' });

    } catch (error) {
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