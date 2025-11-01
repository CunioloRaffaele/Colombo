const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../utils/jwt'); // Import the function to check if the token is blacklisted

if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRATION) {
    console.error('JWT_SECRET or JWT_EXPIRATION is not defined in the environment variables');
    process.exit(1);
}

const SECRET_KEY = process.env.JWT_SECRET;

module.exports = async function (req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    //Check if the token is blacklisted
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Token is blacklisted and account is deleted' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userToken = decoded; // Attach the decoded payload to the request object
        req.jwt = token; // Attach the token to the request object for further use
        next(); // Pass control to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};