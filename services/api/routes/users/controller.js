const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');

exports.createNewAccount = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ 
            error: 'Missing required fields: name, surname, email, password' 
        });
    }
    // Check if user already exists
    const existingUser = await prisma.users.count({
        where: {
            email: email
        }
    });
    if (existingUser > 0) {
        return res.status(400).json({ 
            error: 'User already exists with this email' 
        });
    }
    // Create new user account
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    await prisma.users.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: 0 // Default role
        }
    });
    // Get user ID and role
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    });

    // create JWT token
    const token = generateToken({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });

    res.status(200).json({
        message: 'Account created successfully',
        token: token
    });
};

exports.logUserIn = async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ 
            error: 'Missing required fields: email, password' 
        });
    }
    // Check if user exists
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        return res.status(400).json({ 
            error: 'User not found with this email' 
        });
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ 
            error: 'Invalid password' 
        });
    }
    // create JWT token
    const token = generateToken({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });

    res.status(200).json({
        message: 'Login successful',
        token: token
    });
}

exports.getAccountInfo = (req, res) => {
        res.status(200).json({
        message: 'User info retrieved successfully',
        user: req.userToken
    });
}

exports.deleteAccount = async (req, res) => {
    // Validate required fields
    if (!req.userToken) {
        return res.status(400).json({ 
            error: 'Token is missing' 
        });
    }
    const userId = req.userToken.userId;
    const token = req.jwt;

    try {
        // Execute a transaction to delete the user and add the token to the blacklist
        await prisma.$transaction([
            // Delete the user account
            prisma.users.delete({
                where: {
                    id: userId
                }
            }),
            // Add the token to the blacklist
            prisma.bljwts.create({
                data: {
                    jwt: token
                }
            }),
        ]);

        res.status(200).json({
            message: 'Account deleted and token blacklisted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error deleting account or blacklisting token: ' + error.message
        });
    }
}

exports.sudoDeleteAccount = async (req, res) => {
    // Validate required fields
    if (!req.userToken || req.userToken.role !== 1) {
        return res.status(403).json({ 
            error: 'Only admin (role = 1) can delete accounts' 
        });
    }
    const accountToDelete = parseInt(req.params.id, 10); // Convert to integer (base 10)

    if (isNaN(accountToDelete)) {
        return res.status(500).json({
            error: 'Invalid account ID number'
        });
    }

    try {
        // Check if the user exists
        const user = await prisma.users.findUnique({
            where: {
                id: accountToDelete
            }
        });

        if (!user) {
            return res.status(500).json({
                error: 'User not found'
            });
        }
        // Delete the user account
        await prisma.users.delete({
            where: {
                id: accountToDelete
            }
        }),
        res.status(200).json({
            message: 'Account deleted identified by ID: ' + accountToDelete + ' successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error deleting account: ' + error.message
        });
    }
}

exports.sudoListAccount = async (req, res) => {
    // Validate required fields
    if (!req.userToken || req.userToken.role !== 1) {
        return res.status(403).json({ 
            error: 'Only admin (role = 1) can list accounts' 
        });
    }

    try {
        // List all user accounts
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        res.status(200).json({
            users: users
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error listing accounts: ' + error.message
        });
    }
}