// middleware/checkAirlineEnrolled.js
const { PrismaClient } = require('../prisma/generated/prisma');
const prisma = new PrismaClient();

module.exports = async function (req, res, next) {
    const user = req.userToken;
    if (!user.airlineName || user.role != 2) {
        return res.status(403).json({ error: 'Not an airline user' });
    }
    const airline = await prisma.airlines.findMany({
        where: { 
            name: user.airlineName,
            enrolled: true 
        }
    });
    if (!airline) {
        return res.status(403).json({ error: 'Airline not enrolled or does not exist' });
    }
    next(); // passa al prossimo middleware o controller
};