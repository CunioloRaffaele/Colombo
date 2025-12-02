const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');


exports.startSession = async (req, res) => {
    try{
        res.status(200).json({ message: 'Dummy return' });
    }catch(error){
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
        res.status(200).json({ message: 'Dummy return' });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}