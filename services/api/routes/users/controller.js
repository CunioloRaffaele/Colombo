const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');

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
    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Query parameter is required" });
    }
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
    select: { nome: true, cognome: true, email: true, residenza: true }
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

// Restituisce il numero di sessioni registrate dall'utente autenticato
exports.getUserSessionsCount = async (req, res) => {
  try {
    const email = req.userToken.email;
    // Trova tutte le sessioni associate all'utente
    const user = await prisma.cittadini.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const count = await prisma.sessioni.count({
      where: { vetture: { proprietario: email } }
    });
    return res.status(200).json({ numeroSessioni: count });
  } catch (err) {
    console.error('getUserSessionsCount error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Restituisce la lista di id delle sessioni fatte nel mese/anno specificato
exports.getUserSessionsByMonthYear = async (req, res) => {
  try {
    const email = req.userToken.email;
    const mm = parseInt(req.params.mm);
    const aaaa = parseInt(req.params.aaaa);
    if (isNaN(mm) || isNaN(aaaa) || mm < 1 || mm > 12) {
      return res.status(400).json({ error: 'Mese o anno non valido' });
    }
    // Trova tutte le sessioni associate all'utente nel mese/anno
    const user = await prisma.cittadini.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const startDate = new Date(aaaa, mm - 1, 1);
    const endDate = new Date(aaaa, mm, 1);
    const sessions = await prisma.sessioni.findMany({
      where: {
        vetture: { proprietario: email },
        inizio: {
          gte: BigInt(Math.floor(startDate.getTime() / 1000)),
          lt: BigInt(Math.floor(endDate.getTime() / 1000))
        }
      },
      select: { id: true }
    });
    return res.status(200).json({ sessioni: sessions.map(s => s.id) });
  } catch (err) {
    console.error('getUserSessionsByMonthYear error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Restituisce la lista di tutte le sessioni dell'utente autenticato
exports.getUserSessionsList = async (req, res) => {
  try {
    const email = req.userToken.email;
    // Trova tutte le sessioni associate all'utente
    const user = await prisma.cittadini.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const sessions = await prisma.sessioni.findMany({
      where: { vetture: { proprietario: email } },
      select: { id: true, vettura: true, inizio: true }
    });
    // Per ogni sessione, calcola ecoscore
    const results = [];
    for (const session of sessions) {
      const rilevazioni = await prisma.rilevazioni.findMany({
        where: { sessione: session.id },
        select: { rpm: true, throttle: true, acceleration: true }
      });
      const { getWeightedScore, getInstantScore, twoTailedZTestPValue, variables } = require('../../utils/ecoScore');
      const weightedScores = [];
      for (const r of rilevazioni) {
        for (const key of Object.keys(variables)) {
          if (r[key] !== undefined && typeof r[key] === 'number') {
            const { mu, sigma, weight } = variables[key];
            const pValue = twoTailedZTestPValue(r[key], mu, sigma);
            weightedScores.push(getWeightedScore(pValue, weight));
          }
        }
      }
      const ecoscore = getInstantScore(weightedScores);
      results.push({
        id: session.id,
        vettura: session.vettura,
        data: session.inizio,
        ecoscore
      });
    }
    return res.status(200).json({ sessioni: results });
  } catch (err) {
    console.error('getUserSessionsList error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Restituisce la lista dettagliata di tutte le sessioni dell'utente autenticato per mese/anno
exports.getUserSessionsListByMonthYear = async (req, res) => {
  try {
    const email = req.userToken.email;
    const mm = parseInt(req.params.mm);
    const aaaa = parseInt(req.params.aaaa);
    if (isNaN(mm) || isNaN(aaaa) || mm < 1 || mm > 12) {
      return res.status(400).json({ error: 'Mese o anno non valido' });
    }
    // Trova tutte le sessioni associate all'utente nel mese/anno
    const user = await prisma.cittadini.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const startDate = new Date(aaaa, mm - 1, 1);
    const endDate = new Date(aaaa, mm, 1);
    const sessions = await prisma.sessioni.findMany({
      where: {
        vetture: { proprietario: email },
        inizio: {
          gte: BigInt(Math.floor(startDate.getTime() / 1000)),
          lt: BigInt(Math.floor(endDate.getTime() / 1000))
        }
      },
      select: { id: true, vettura: true, inizio: true }
    });
    // Per ogni sessione, calcola ecoscore
    const results = [];
    for (const session of sessions) {
      const rilevazioni = await prisma.rilevazioni.findMany({
        where: { sessione: session.id },
        select: { rpm: true, throttle: true, acceleration: true }
      });
      const { getWeightedScore, getInstantScore, twoTailedZTestPValue, variables } = require('../../utils/ecoScore');
      const weightedScores = [];
      for (const r of rilevazioni) {
        for (const key of Object.keys(variables)) {
          if (r[key] !== undefined && typeof r[key] === 'number') {
            const { mu, sigma, weight } = variables[key];
            const pValue = twoTailedZTestPValue(r[key], mu, sigma);
            weightedScores.push(getWeightedScore(pValue, weight));
          }
        }
      }
      const ecoscore = getInstantScore(weightedScores);
      results.push({
        id: session.id,
        vettura: session.vettura,
        data: session.inizio,
        ecoscore
      });
    }
    return res.status(200).json({ sessioni: results });
  } catch (err) {
    console.error('getUserSessionsListByMonthYear error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
