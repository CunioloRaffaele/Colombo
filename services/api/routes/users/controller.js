const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');
const createDecoder = require('@cardog/corgi').createDecoder;

// Registrazione cittadino
exports.registerUser = async (req, res) => {
  try {
    const { nome, cognome, email, password, residenza } = req.body;

    // Check required fields
    if (!nome || !cognome || !email || !password || !residenza) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user already exists
    const existingUser = await prisma.cittadini.findUnique({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.cittadini.create({
      data: {
        nome,
        cognome,
        email,
        password: hashedPassword,
        residenza   // ← deve essere un int (istat del comune)
      }
    });

    // Generate JWT
    const token = generateToken({
      email: email,
      type: 'cittadino',
      nome: user.nome
    });

    return res.status(201).json({
      message: 'Account created successfully',
      token
    });

  } catch (err) {
    console.error("registerUser error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Login cittadino
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing required fields' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  const user = await prisma.cittadini.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });

  const token = generateToken({ email: user.email, type: 'cittadino', nome: user.nome });
  res.status(200).json({ message: 'Login successful', token });
};

//Modifica info cittadino
exports.updateUser = async (req, res) => {
  try {
    const userEmail = req.userToken.email;
    const {email, password, nome, cognome, residenza } = req.body;

    // Check required fields
    if (!nome || !cognome || !residenza || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    hashedPassword = await bcrypt.hash(password, 10);
    
    // Update the user
    const updatedUser = await prisma.cittadini.update({
      where: { email: userEmail },
      data: {
        nome: nome,
        cognome: cognome,
        residenza: residenza,
        email: email,
        password: hashedPassword
      }
    });

    return res.status(200).json({
      message: 'User information updated successfully',
      user: updatedUser
    });

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Elimina account cittadino
exports.deleteUser = async (req, res) => {
  try {
    const userEmail = req.userToken.email;
    
    // Delete the user
    await prisma.cittadini.delete({
      where: { email: userEmail }
    });
    return res.status(200).json({ message: 'User account deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Registrazione comune
exports.registerComune = async (req, res) => {
  try {
    const { comune, email, password } = req.body;

    // Validate required fields
    if (!comune || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if a comune with this email already exists (in the auth table)
    const existingComune = await prisma.comuni_registrati.findUnique({
      where: { email }
    });
    if (existingComune) {
      return res.status(400).json({ error: 'Comune with this email already exists' });
    }

    // Check if comune ISTAT exists in the comuni table
    const datiComune = await prisma.comuni.findUnique({
      where: { istat: parseInt(comune) }
    });

    if (!datiComune) {
      return res.status(404).json({ error: 'Comune ISTAT not found' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create auth entry for comune
    const comuneRecord = await prisma.comuni_registrati.create({
      data: {
        comune: parseInt(comune),       // ISTAT
        email,
        password: hashedPassword
      }
    });

    // Create JWT
    const token = generateToken({
      email: comuneRecord.email,
      type: 'comune',
      comune: datiComune.citta
    });

    return res.status(201).json({
      message: 'Comune account created successfully',
      token
    });

  } catch (error) {
    console.error("registerComune error:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Login comune
exports.loginComune = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing required fields' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const comune = await prisma.comuni_registrati.findUnique({ where: { email } });
  if (!comune) return res.status(400).json({ error: 'Comune not found' });

  const isPasswordValid = await bcrypt.compare(password, comune.password);
  if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });

  const token = generateToken({comune: comune.comune, email: comune.email, type: 'comune', password: comune.password });
  res.status(200).json({ message: 'Login successful', token });
};

// Ottenere tutti i comuni
exports.getAllComuni = async (req, res) => {
  try {
    const comuni = await prisma.comuni_registrati.findMany({
      select: { comune: true, email: true, password: true }
    });
    res.json(comuni);
  } catch (err) {
    res.status(500).json({ error: 'Error while retrieving municipalities' });
  }
};

// Ottenere una lista di comuni in base a filtro di ricerca
exports.searchComuni = async (req, res) => {
 try {
    const query = req.query.query;
    const comuni = await prisma.comuni.findMany({
      where: {
        citta: {
          startsWith: query,
          mode: "insensitive", // ricerca case-insensitive
        }
      },
      orderBy: {
        citta: "asc"
      },
      take: 20 // opzionale: limita i risultati
    });
    const response = comuni.map(c => ({
      id: c.istat,
      name: c.citta
    }));
    return res.status(200).json({message: "Comuni trovati", response});

  } catch (err) {
    return res.status(500).json({ error: "Errore while retrieving comuni" });
  }
};

// Informazioni account cittadino
exports.getUserAccountInfo = async (req, res) => {
  const userEmail = req.userToken.email; 

  const user = await prisma.cittadini.findUnique({
    where: { email: userEmail },
    select: { nome: true, cognome: true, email: true, password: true, residenza: true }
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// Informazioni account comune
exports.getComuneAccountInfo = async (req, res) => {
  const comuneEmail = req.userToken.email; 
  const comune = await prisma.comuni_registrati.findUnique({
    where: { email: comuneEmail },
    select: { comune:true, email: true, password: true }
  });
  if (!comune) return res.status(404).json({ error: 'Comune not found' });
  res.json(comune);
};
