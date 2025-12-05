const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');



exports.ecoscoreComune = async (req, res) => {
    try{
        const istat = parseInt(req.params.istat, 10);
        if(!istat || isNaN(istat) || !/^\d+$/.test(req.params.istat) ){
            return res.status(400).json({ error: 'Invalid ISTAT code' });
        }

        const comuneEmail = req.userToken.email; 
        // Check if a comune with this email already exists (in the auth table)
        const existingComune = await prisma.comuni_registrati.findUnique({
          where: { email: comuneEmail, comune: istat },
        });
        if (!existingComune) {
          return res.status(404).json({ error: 'Comune with this email and/or istat doesn\'t exist' });
        }

        // Fetch ecoscore data for the given ISTAT code
        const ecoscoreComune = await prisma.$queryRaw`
        SELECT ecoscore_comune(${existingComune.comune}::int) AS ecoscore;
`;

    if(ecoscoreComune[0].ecoscore=== null){
        return res.status(200).json({message: "No ecoscore found for this comune", ecoscore: -1 });
    }
    return res.status(200).json({message: "Ecoscore retrieved successfully", ecoscore: ecoscoreComune[0].ecoscore });

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.ecoscoreSessione = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'Invalid session ID' });
        }
        const ret = await prisma.$queryRaw`
        SELECT ecoscore_sessione(${id}::int) AS ecoscore`;
        const ecoscore = ret[0].ecoscore;
        if(ecoscore === null){
            return res.status(200).json({message: "No ecoscore found for this session", ecoscore: -1 });
        }
        return res.status(200).json({message: "Ecoscore retrieved successfully", ecoscore: ecoscore });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.ecoscoreUtente = async (req, res) => {
    try {
        const email = req.params.email;
        const userEmail = req.userToken.email; 

        //Controlli sull'email (token e param)
        if (!email|| typeof email !== 'string') {
            return res.status(400).json({ error: 'Invalid email' });
        }
        if (email !== userEmail) {
            return res.status(403).json({ error: 'Forbidden: You can only access your own ecoscore' });
        }

        const userExists = await prisma.cittadini.findUnique({
            where: { email: email },
        });
        if (!userExists) {
            return res.status(404).json({ error: 'User with this email doesn\'t exist' });
        }

        const ret = await prisma.$queryRaw`
        SELECT ecoscore_cittadino(${email}::text) AS ecoscore`;
        const ecoscore = ret[0].ecoscore;

        if(ecoscore === null){
            return res.status(200).json({message: "No ecoscore found for this user", ecoscore: -1 });
        }
        return res.status(200).json({message: "Ecoscore retrieved successfully", ecoscore: ecoscore });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}