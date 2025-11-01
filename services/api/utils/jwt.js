const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../prisma/generated/prisma');
const prisma = new PrismaClient()

if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRATION) {
    console.error('JWT_SECRET or JWT_EXPIRATION is not defined in the environment variables');
    process.exit(1);
}

const SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

// Generate a JWT token
exports.generateToken = (payload, expiresIn = JWT_EXPIRATION) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verify a JWT token manually BUT USE THE AUTH MIDDLEWARE
exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

exports.isTokenBlacklisted = async (token) => {
    try {
        const user = await prisma.bljwts.findFirst({
            where: {
                jwt: token
            }
        });
        return !!user;
    } catch (error) {
        console.error('Error checking token blacklist:', error);
        // Decide: return false (fail open) or true (fail closed)
        return false;
    }
};