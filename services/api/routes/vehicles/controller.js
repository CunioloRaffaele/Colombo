const prisma = require('../../utils/prisma');
const vinDecoder = require('../../utils/vin');
const emissions = require('../../utils/emissions');
const crypto = require('crypto');

// Aggiungi una vettura all'utente
exports.addCarToUser = async (req, res) => {
    try {
        const userEmail = req.userToken.email;
        let { vin } = req.body;

        if (vin.length !== 17) {
            return res.status(400).json({ error: 'Invalid VIN length. VIN must be 17 characters long.' });
        }

        // Se il VIN è composto da 17 zeri (caso in cui il veicolo non lo espone),
        // ne generiamo uno univoco per poter salvare la vettura nel DB.
        if (vin === '00000000000000000') {
            let uniqueFound = false;
            while (!uniqueFound) {
                const uniqueSuffix = crypto.randomBytes(5).toString('hex').toUpperCase();
                // 'NO_VIN_' (7 chars) + 10 chars hex = 17 chars
                const candidateVin = 'NO_VIN_' + uniqueSuffix;

                // Verifichiamo che questo VIN generato non esista già
                const check = await prisma.vetture.findUnique({
                    where: { vin: candidateVin }
                });

                if (!check) {
                    vin = candidateVin;
                    uniqueFound = true;
                }
            }
        }

        // Verifica se la vettura esiste già per qualche utente
        const existingCar = await prisma.vetture.findUnique({
            where: { vin: vin }
        });

        if (existingCar) {
            return res.status(409).json({ error: 'Car is already associated with a user' });
        }

        // Find the user
        const user = await prisma.cittadini.findUnique({
            where: { email: userEmail }
        });

        if (!user) {
            return res.status(404).json({ error: 'User (email) not found' });
        }

        // Add car to user
        const newCar = await prisma.vetture.create({
            data: {
                proprietario: user.email,
                vin: vin,
            }
        });

        return res.status(201).json({
            message: 'Car added successfully',
            car: newCar
        });

    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Elenca tutte le vetture dell'utente
exports.listUserCars = async (req, res) => {
    try {
        const userEmail = req.userToken.email;
        
        // Find the user
        const user = await prisma.cittadini.findUnique({
            where: { email: userEmail }
        });
        if (!user) {
            return res.status(404).json({ error: 'User (email) not found' });
        }
        
        // Get cars of the user
        const cars = await prisma.vetture.findMany({
            where: { proprietario: user.email },
        });

        // Verify if user has a car with "NO_VIN_" prefix
        for (let car of cars) {
            if (car.vin.startsWith('NO_VIN_')) {
                car.vin = '00000000000000000'; // Replace with 17 zeros for response
            }
        }

        return res.status(200).json({
            message: 'User cars retrieved successfully',
            cars: cars
        });

    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Ottieni informazioni dettagliate di una vettura tramite VIN
exports.getCarInfo = async (req, res) => {
    try {
        const { vin } = req.params;
        
        // Validate VIN length
        if (vin.length !== 17) {
            return res.status(400).json({ error: 'Invalid VIN length. VIN must be 17 characters long.' });
        }

        if (vin === '00000000000000000' || vin.startsWith('NO_VIN_')) {
            return res.status(400).json({ error: 'No detailed information available for vehicles without a valid VIN.' });
        }

        // Find the car by VIN and return it if it belongs to the requesting user
        const car = await prisma.vetture.findFirst({
            where: { 
                vin: vin, 
                proprietario: req.userToken.email
            },
        });
        
        if (!car) {
            return res.status(404).json({ error: 'No cars found with the provided VIN' });
        }

        const result = vinDecoder.getVIN(car.vin);

        // Aggiungi stime emissioni basate sull'anno del modello
        if (result && result.modelYear) {
            result['co2Perkm'] = emissions.co2PerKm(result.modelYear);
            result['pmPerkm'] = emissions.pmPerKm(result.modelYear);
        }

        return res.status(200).json({
            message: 'Car info retrieved successfully via VIN',
            result
        });
    } catch (err) {
        console.error("Error in getCarInfo:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Rimuovi una vettura dall'utente tramite VIN
exports.removeCarFromUser = async (req, res) => {
    try {
        const userEmail = req.userToken.email;
        const { vin } = req.params;
        
        if (vin.length !== 17) {
            return res.status(400).json({ error: 'Invalid VIN length. VIN must be 17 characters long.' });
        }
        // Find the user
        const user = await prisma.cittadini.findUnique({
            where: { email: userEmail }
        });
        if (!user) {
            return res.status(404).json({ error: 'User (email) not found' });
        }
        
        // Delete the car if it belongs to the user
        const deletedCar = await prisma.vetture.deleteMany({
            where: {
                vin: vin,
                proprietario: user.email
            }
        });
        
        if (deletedCar.count === 0) {
            return res.status(404).json({ error: 'Car not found or does not belong to the user' });
        }

        return res.status(200).json({
            message: 'Car removed successfully'
        });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};