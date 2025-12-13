const prisma = require('../../utils/prisma');
const vinDecoder = require('../../utils/vin');
const emissions = require('../../utils/emissions');

// Aggiungi una vettura all'utente
exports.addCarToUser = async (req, res) => {
    try {
        const userEmail = req.userToken.email;
        const { vin } = req.body;

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
        console.log("Car model year:", result.modelYear);
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