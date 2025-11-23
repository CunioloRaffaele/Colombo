const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');

// Registrazione cittadino
/**
 * @swagger
 * /api/v1/auth/user
 *   post:
 *     summary: Register a new citizen
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cognome
 *               - email
 *               - password
 *               - residenza
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Marco
 *               cognome:
 *                 type: string
 *                 example: Rossi
 *               email:
 *                 type: string
 *                 example: marco@gmail.com
 *               password:
 *                 type: string
 *                 example: 123123
 *               residenza:
 *                 type: integer
 *                 example: 18007
 *     responses:
 *       201:
 *         description: Citizen account created
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/v1/auth/login/user:
 *   post:
 *     summary: Login a citizen
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: marco@gmail.com
 *               password:
 *                 type: string
 *                 example: 123123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing fields, invalid email or wrong credentials
 *       500:
 *         description: Server error
 */
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

// Registrazione comune
/**
 * @swagger
 * /api/v1/auth/comune:
 *   post:
 *     summary: Register a municipality
 *     tags: [Comuni]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comune
 *               - email
 *               - password
 *             properties:
 *               comune:
 *                 type: integer
 *                 description: ISTAT code of the municipality
 *                 example: 10010
 *               email:
 *                 type: string
 *                 example: comune.italiano@email.com
 *               password:
 *                 type: string
 *                 example: superpassword
 *     responses:
 *       201:
 *         description: Municipality registered
 *       400:
 *         description: Missing or invalid fields
 *       404:
 *         description: ISTAT code not found
 *       500:
 *         description: Server error
 */
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
      where: { istat: comune }
    });

    if (!datiComune) {
      return res.status(404).json({ error: 'Comune ISTAT not found' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create auth entry for comune
    const comuneRecord = await prisma.comuni_registrati.create({
      data: {
        comune: comune,       // ISTAT
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
/**
 * @swagger
 * /api/v1/auth/login/comune:
 *   post:
 *     summary: Login a municipality
 *     tags: [Comuni]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: comune.italiano@email.com
 *               password:
 *                 type: string
 *                 example: 123123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing fields, invalid email or wrong password
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/v1/auth/comuni:
 *   get:
 *     summary: Get all registered municipalities
 *     tags: [Comuni]
 *     responses:
 *       200:
 *         description: List of registered municipalities
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/v1/auth/comuni/subset:
 *   get:
 *     summary: Search municipalities by name prefix
 *     tags: [Comuni]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         example: Bagn
 *         description: Start of the municipality name
 *     responses:
 *       200:
 *         description: Matching municipalities
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/v1/auth/user:
 *   get:
 *     summary: Get authenticated citizen account info
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Citizen account info
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
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
/**
 * @swagger
 * /api/v1/auth/comune
 *   get:
 *     summary: Get authenticated municipality account info
 *     tags: [Comuni]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Municipality account info
 *       404:
 *         description: Municipality not found
 *       401:
 *         description: Unauthorized
 */
exports.getComuneAccountInfo = async (req, res) => {
  const comuneEmail = req.userToken.email; 
  const comune = await prisma.comuni_registrati.findUnique({
    where: { email: comuneEmail },
    select: { comune:true, email: true, password: true }
  });
  if (!comune) return res.status(404).json({ error: 'Comune not found' });
  res.json(comune);
};