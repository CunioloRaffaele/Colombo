const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');
const emissions = require('../../utils/emissions');
const vinDecoder = require('../../utils/vin');
// Import Protobuf DriveDataPoint
const proto = require('../../proto/compiled/api/v1/api/v1/drive_data_point_pb');
const ecoScore = require('../../utils/ecoScore');

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


exports.sendReadings = async (req, res) => {
    try {
        // Dati provenienti da elm327
        const sensorData = req.body;

        // Mappa vitals disponibili (chiave: nome, valore: disponibilità)
        const availableVitals = {
            rpm: !!sensorData.rpmAvailable,
            speed: !!sensorData.speedAvailable,
            throttlePosition: !!sensorData.throttlePositionAvailable,
            coolantTemp: !!sensorData.coolantTempAvailable,
            fuelRate: !!sensorData.fuelRateAvailable,
            odometer: !!sensorData.odometerAvailable,
            engineExhaustFlow: !!sensorData.engineExhaustFlowAvailable,
            fuelTankLevel: !!sensorData.fuelTankLevelAvailable,
            acceleration: sensorData.acceleration !== undefined // opzionale
        };
        const availableKeys = Object.keys(availableVitals).filter(k => availableVitals[k]);

        // Pesi corretti
        const adjustedVariables = ecoScore.getAdjustedVariables(availableKeys);

        // Calcolo score per ogni variabile disponibile
        let componentScores = [];
        for (const key of availableKeys) {
            let value = sensorData[key];
            // Se non presente, salta
            if (value === undefined || value === null) continue;
            // Parametri statistici
            const variable = adjustedVariables[key];
            // Calcolo p-value
            const pValue = ecoScore.twoTailedZTestPValue(
                parseFloat(value),
                variable.mu,
                variable.sigma
            );
            // Calcolo weighted score
            const weightedScore = ecoScore.getWeightedScore(pValue, variable.weight);
            componentScores.push(weightedScore);
        }
        // Total score
        const totalScore = ecoScore.getInstantScore(componentScores);

        // Costruisci il messaggio Protobuf
        const driveDataPoint = new proto.DriveDataPoint();
        driveDataPoint.setTimestampUnix(sensorData.timestampUnix);
        driveDataPoint.setRpmAvailable(sensorData.rpmAvailable);
        driveDataPoint.setRpm(sensorData.rpm);
        driveDataPoint.setSpeedAvailable(sensorData.speedAvailable);
        driveDataPoint.setSpeed(sensorData.speed);
        driveDataPoint.setThrottlePositionAvailable(sensorData.throttlePositionAvailable);
        driveDataPoint.setThrottlePosition(sensorData.throttlePosition);
        driveDataPoint.setCoolantTempAvailable(sensorData.coolantTempAvailable);
        driveDataPoint.setCoolantTemp(sensorData.coolantTemp);
        driveDataPoint.setFuelRateAvailable(sensorData.fuelRateAvailable);
        driveDataPoint.setFuelRate(sensorData.fuelRate);
        driveDataPoint.setOdometerAvailable(sensorData.odometerAvailable);
        driveDataPoint.setOdometer(sensorData.odometer);
        driveDataPoint.setEngineExhaustFlowAvailable(sensorData.engineExhaustFlowAvailable);
        driveDataPoint.setEngineExhaustFlow(sensorData.engineExhaustFlow);
        driveDataPoint.setFuelTankLevelAvailable(sensorData.fuelTankLevelAvailable);
        driveDataPoint.setFuelTankLevel(sensorData.fuelTankLevel);
        driveDataPoint.setLatitude(sensorData.latitude);
        driveDataPoint.setLongitude(sensorData.longitude);

        // Serializza in binario
        const buffer = driveDataPoint.serializeBinary();


        // Salva la rilevazione nel database usando una query raw PostGIS
        const sessioneId = parseInt(req.params.id);
        const longitude = sensorData.longitude;
        const latitude = sensorData.latitude;
        await prisma.$executeRaw`INSERT INTO rilevazioni (sessione, punto, punteggio) VALUES (
            ${sessioneId},
            ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
            ${totalScore}
        )`;

        // Risposta: score + dati serializzati
        res.status(200).json({
            message: 'Rilevazione ricevuta',
            ecoscore: totalScore,
            data: Buffer.from(buffer).toString('base64')
        });
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