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


const ecoScore = require('../../utils/ecoScore');

exports.sendReadings = async (req, res) => {
    try {
        // Support both JSON and Protobuf (Content-Type: application/json or application/octet-stream)

        let sessionId, readings;
        if (req.is('application/json')) {
            // JSON: { data_points: [ ... ] }
            sessionId = req.params.id;
            readings = req.body.data_points;
        } else if (req.is('application/octet-stream')) {
            // Protobuf: decode using generated JS classes (DriveDataPointArray)
            const DriveDataPointArray = require('../../proto/api/v1/data_point_pb').DriveDataPointArray;
            const batch = DriveDataPointArray.deserializeBinary(req.body);
            sessionId = req.params.id;
            readings = batch.getDataPointsList().map(r => r.toObject());
        } else {
            // Content-Type non supportato: restituisci 400 con errore
            return res.status(400).json({ error: 'Unsupported content type' });
        }

        if (!sessionId || !Array.isArray(readings) || readings.length === 0) {
            return res.status(400).json({ error: 'Missing session_id or data_points' });
        }

        // Controllo che la sessione esista e appartenga all'utente
        const email = req.userToken.email;
        const sessione = await prisma.sessioni.findFirst({
            where: {
                id: Number(sessionId),
                vetture: {
                    proprietario: email
                }
            }
        });
        if (!sessione) {
            return res.status(404).json({ error: 'Session not found or not associated with user' });
        }

        let processed = 0;
        let readingsTotScore = [];
        // Mappa snake_case -> camelCase per ecoScore
        const keyMap = {
            rpm: 'rpm',
            speed: 'speed',
            throttle_position: 'throttlePosition',
            coolant_temp: 'coolantTemp',
            fuel_rate: 'fuelRate',
            engine_exhaust_flow: 'engineExhaustFlow',
            acceleration: 'acceleration',
            odometer: 'odometer',
            fuel_tank_level: 'fuelTankLevel'
        };
        for (const [i, reading] of readings.entries()) {
            // Controllo presenza latitude e longitude
            if (typeof reading.latitude !== 'number' || typeof reading.longitude !== 'number') {
                return res.status(400).json({
                    error: `Missing latitude or longitude in data_points[${i}]`
                });
            }
            // Estraggo la mappa delle variabili disponibili
            const availableVitals = reading.available_vitals || reading.availableVitals || {};
            // Solo le chiavi gestite da ecoScore
            const availableKeys = Object.keys(availableVitals)
                .filter(k => availableVitals[k] && keyMap[k]);
            // Calcolo pesi aggiustati (in camelCase)
            const camelKeys = availableKeys.map(k => keyMap[k]);
            const adjustedVars = ecoScore.getAdjustedVariables(camelKeys);
            // Calcolo weighted scores
            let componentScores = [];
            for (const key of availableKeys) {
                const camelKey = keyMap[key];
                const variable = adjustedVars[camelKey];
                let value = reading[key];
                // Salta se la variabile non è gestita o il valore non è numerico
                if (!variable || typeof value !== 'number') continue;
                const pValue = ecoScore.twoTailedZTestPValue(value, variable.mu, variable.sigma);
                const weightedScore = ecoScore.getWeightedScore(pValue, variable.weight);
                componentScores.push(weightedScore);
            }
            const totalScore = ecoScore.getInstantScore(componentScores);
            readingsTotScore.push(totalScore);

            // Salva su rilevazioni: solo query raw PostGIS, compatibile con il DB
            await prisma.$executeRawUnsafe(
                `INSERT INTO rilevazioni (sessione, punto, punteggio) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326), $4)`,
                Number(sessionId), reading.longitude, reading.latitude, totalScore
            );
            processed++;
        }

        // Risposta compatibile con Swagger e Protobuf
        const response = {
            success: true,
            message: 'Readings processed',
            readings_processed: processed,
            readings_tot_score: readingsTotScore
        };
        if (req.is('application/json')) {
            return res.status(200).json(response);
        } else if (req.is('application/octet-stream')) {
            // Protobuf: restituisci solo 200 OK vuoto
            return res.status(200).end();
        }
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

        // Verifica che l'id appartenga all'utente
        const sessioneCheck = await prisma.sessioni.findFirst({
            where: {
                id: sessioneId,
                vetture: {
                    proprietario: email
                }
            }
        });

        if (!sessioneCheck) {
            return res.status(404).json({ error: 'Session not found or does not belong to the user' });
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