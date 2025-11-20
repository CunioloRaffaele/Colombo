const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');

// Registrazione cittadino
exports.registerUser = async (req, res) => {
  const { nome, email, password, data_nascita } = req.body;
  if (!nome || !email || !password || !data_nascita) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  const existingUser = await prisma.cittadini.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.cittadini.create({
    data: {
      nome,
      email,
      password: hashedPassword,
      data_nascita: data_nascita ? new Date(data_nascita) : null
    }
  });
  const token = generateToken({ id: user.id, type: 'cittadino', nome: user.nome });
  res.status(201).json({ message: 'Account created successfully', token });
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

  const token = generateToken({ id: user.id, type: 'cittadino', nome: user.nome });
  res.status(200).json({ message: 'Login successful', token });
};

// Registrazione comune
exports.registerComune = async (req, res) => {
  const { nome, provincia, regione, email, password } = req.body;
  if (!nome || !provincia || !regione || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  const existingComune = await prisma.comuni.findUnique({ where: { email } });
  if (existingComune) return res.status(400).json({ error: 'Comune already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const comune = await prisma.comuni.create({
    data: { nome, provincia, regione, email, password: hashedPassword }
  });
  const token = generateToken({ id: comune.id, type: 'comune', nome: comune.nome });
  res.status(201).json({ message: 'Comune created successfully', token});
};

// Login comune
exports.loginComune = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing required fields' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const comune = await prisma.comuni.findUnique({ where: { email } });
  if (!comune) return res.status(400).json({ error: 'Comune not found' });

  const isPasswordValid = await bcrypt.compare(password, comune.password);
  if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });

  const token = generateToken({ id: comune.id, type: 'comune', nome: comune.nome });
  res.status(200).json({ message: 'Login successful', token });
};

// Ottenere tutti i comuni
exports.getAllComuni = async (req, res) => {
  try {
    const comuni = await prisma.comuni.findMany({
      select: { id: true, nome: true, provincia: true, regione: true, email: true }
    });
    res.json(comuni);
  } catch (err) {
    res.status(500).json({ error: 'Error while retrieving municipalities' });
  }
};

// Informazioni account cittadino
exports.getUserAccountInfo = async (req, res) => {
  const userId = req.userToken.id; 
  const user = await prisma.cittadini.findUnique({
    where: { id: userId },
    select: { id: true, nome: true, email: true, data_nascita: true }
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// Informazioni account comune

exports.getComuneAccountInfo = async (req, res) => {
  const comuneId = req.userToken.id; 
  const comune = await prisma.comuni.findUnique({
    where: { id: comuneId },
    select: { id: true, nome: true, provincia: true, regione: true, email: true }
  });
  if (!comune) return res.status(404).json({ error: 'Comune not found' });
  res.json(comune);
};