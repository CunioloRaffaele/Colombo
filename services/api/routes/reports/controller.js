const { generateToken } = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const prisma = require('../../utils/prisma');


// Ecoscore totale comune
exports.ecoscoreComune = async (req, res) => {
  try {
    const istat = parseInt(req.params.istat, 10);
    if (!istat || isNaN(istat) || !/^\d+$/.test(req.params.istat)) {
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

    if (ecoscoreComune[0].ecoscore === null) {
      return res.status(200).json({ message: "No ecoscore found for this comune", ecoscore: -1 });
    }
    return res.status(200).json({ message: "Ecoscore retrieved successfully", ecoscore: ecoscoreComune[0].ecoscore });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.summaryZona = async (req, res) => {
  try {
    const zonaId = parseInt(req.params.id, 10);
    if (isNaN(zonaId)) {
      return res.status(400).json({ error: 'Invalid zone ID' });
    }

    // Verifica che l'utente sia un comune
    if (req.userToken.type !== 'comune') {
      return res.status(403).json({ error: 'Accesso riservato ai comuni' });
    }

    const comuneEmail = req.userToken.email;

    // Verifica esistenza del comune e recupero ISTAT
    const existingComune = await prisma.comuni_registrati.findUnique({
      where: { email: comuneEmail },
    });
    if (!existingComune) {
      return res.status(404).json({ error: 'Comune non trovato' });
    }
    const comuneIstat = existingComune.comune;

    // Verifica esistenza della zona e che appartenga al comune
    const zoneResult = await prisma.$queryRaw`SELECT id, comune FROM zone WHERE id = ${zonaId}`;
    const zona = zoneResult[0];

    if (!zona) {
      return res.status(404).json({ error: 'Zona non trovata' });
    }

    if (zona.comune !== comuneIstat) {
      return res.status(403).json({ error: 'Non hai il permesso di accedere a questa zona' });
    }

    // Calcola l'ecoscore medio e le medie di PM e CO2 per la zona specificata
    const result = await prisma.$queryRaw`
      SELECT 
      AVG(r.punteggio) as ecoscore,
      AVG(s.pm) as pm,
      AVG(s.co2) as co2
      FROM rilevazioni r
      JOIN sessioni s ON r.sessione = s.id
      WHERE ST_Intersects(r.punto, (SELECT poligono FROM zone WHERE id = ${zonaId}))
    `;

    const summary = result[0];
    const ecoscore = summary.ecoscore;

    // Se ecoscore è null, significa che non ci sono rilevazioni nella zona
    if (ecoscore === null || ecoscore === undefined) {
      return res.status(200).json({
        message: "Nessuna rilevazione per questa zona",
        ecoscore: -1,
        pm: 0,
        co2: 0
      });
    }

    return res.status(200).json({
      message: "Summary retrieved successfully",
      ecoscore: ecoscore,
      pm: summary.pm || 0,
      co2: summary.co2 || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Ecoscore totale sessione - cittadino
exports.ecoscoreSessione = async (req, res) => {
  try {
    const id = req.params.id;
    const userEmail = req.userToken.email;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }
    const session = await prisma.sessioni.findUnique({
      where: { id: parseInt(id) },
      include: {
        vetture: true,
      },
    });
    if (!session) {
      return res.status(404).json({ error: 'Codice sessione non trovato' });
    }
    if (session.vetture.proprietario !== userEmail) {
      return res.status(403).json({ error: 'Non hai il permesso di accedere a questa sessione' });
    }
    const ret = await prisma.$queryRaw`
        SELECT ecoscore_sessione(${id}::int)*100 AS ecoscore`;
    const ecoscore = ret[0].ecoscore;

    // Trova i comuni e le zone attraversate con il relativo ecoscore
    const comuniAttraversatiRaw = await prisma.$queryRaw`
        SELECT
            z.comune AS istat_comune,
            c.citta, c.regione,
            z.id AS zona_id,
            AVG(r.punteggio)*100 AS ecoscore_zona
        FROM rilevazioni r
        JOIN zone z ON ST_Intersects(r.punto, z.poligono)
        JOIN comuni c ON z.comune = c.istat
        WHERE r.sessione = ${id}::int
        GROUP BY z.comune, z.id, c.citta, c.regione
    `;

    // Raggruppa i risultati per comune
    const comuniAttraversati = comuniAttraversatiRaw.reduce((acc, curr) => {
      let comune = acc.find(c => c.istat === curr.istat_comune);
      if (!comune) {
        comune = {
          istat: curr.istat_comune,
          citta: curr.citta,
          regione: curr.regione,
          zone_attraversate: []
        };
        acc.push(comune);
      }
      comune.zone_attraversate.push({
        zona_id: curr.zona_id,
        ecoscore: curr.ecoscore_zona
      });
      return acc;
    }, []);

    const responseData = {
      message: ecoscore !== null ? "Ecoscore retrieved successfully" : "No ecoscore found for this session",
      ecoscore: ecoscore,
      km: session.km,
      vin: session.vettura,
      pm: session.pm,
      co2: session.co2,
      comuni_attraversati: comuniAttraversati
    };

    return res.status(200).json(responseData);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Ecoscore totale cittadino
exports.ecoscoreUtente = async (req, res) => {
  try {
    const email = req.userToken.email;

    // Controllo sull'email (dal token)
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const userExists = await prisma.cittadini.findUnique({
      where: { email: email },
    });
    if (!userExists) {
      return res.status(404).json({ error: 'User with this email doesn\'t exist' });
    }

    const ret = await prisma.$queryRaw`
        SELECT 
          ecoscore_cittadino(${email}::text) AS ecoscore,
          (
            SELECT COUNT(s.id)
            FROM cittadini c
            JOIN vetture v ON c.email = v.proprietario
            JOIN sessioni s ON v.vin = s.vettura
            WHERE c.email = ${email}::text
          )::int AS "numeroSessioni"
      `;
    const { ecoscore, numeroSessioni } = ret[0];

    if (ecoscore === null) {
      return res.status(200).json({ message: "No ecoscore found for this user", ecoscore: -1, numeroSessioni: 0 });
    }
    return res.status(200).json({ message: "Ecoscore retrieved successfully", ecoscore: ecoscore*100, numeroSessioni: numeroSessioni });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


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
    return res.status(200).json({message:"Number of sessions retrieved successfully", numeroSessioni: count });
  } catch (err) {
    console.error('getUserSessionsCount error:', err);
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
      select: { id: true, vettura: true, inizio: true, km: true, co2: true, pm: true }
    });

    const sessionsWithEcoscore = await Promise.all(sessions.map(async (session) => {
      const ret = await prisma.$queryRaw`
        SELECT ecoscore_sessione(${session.id}::int)*100 AS ecoscore`;
      const ecoscore = ret[0].ecoscore;
      return {
      ...session,
      inizio: session.inizio.toString(),
      ecoscore: ecoscore !== null ? ecoscore : -1
      };
    }));

    return res.status(200).json({ message: "Sessions retrieved successfully", sessioni: sessionsWithEcoscore });
  } catch (err) {
    console.error('getUserSessionsListByMonthYear error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};