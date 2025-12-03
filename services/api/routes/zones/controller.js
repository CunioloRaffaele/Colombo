const prisma = require('../../utils/prisma');

const { isValidCoordinatesArray } = require('../../utils/coordinates');

// Salva zona
exports.saveZone = async (req, res) => {
  if (req.userToken.type !== 'comune' || typeof req.userToken.comune !== 'number') {
    return res.status(403).json({ error: 'Accesso riservato ai comuni autenticati' });
  }

  const comune = req.userToken.comune;
  const { coordinates, tipologia } = req.body;

  if (!isValidCoordinatesArray(coordinates)) {
    return res.status(400).json({ error: 'coordinates deve essere un array di almeno 3 coppie [lng, lat] numeriche' });
  }

  // Chiude il poligono se necessario
  const coords = [...coordinates];
  if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
    coords.push(coords[0]);
  }

  const poligonoWKT = `POLYGON((${coords.map(c => `${c[0]} ${c[1]}`).join(', ')}))`;

  try {
    const sql = `
      INSERT INTO zone (poligono, comune, tipologia)
      VALUES (ST_GeomFromText($1, 4326), $2, $3)
    `;
    await prisma.$executeRaw`
      INSERT INTO zone (poligono, comune, tipologia)
      VALUES (ST_GeomFromText(${poligonoWKT}, 4326), ${comune}, ${tipologia || 'generica'})
    `;
    return res.status(201).json({ message: 'Zona salvata correttamente' });
  } catch (err) {
    console.error('saveZone error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nel salvataggio della zona', details: err.message });
  }
};

// Verifica punto
exports.checkPointInZone = async (req, res) => {
  const { point } = req.body;

  if (!Array.isArray(point) || point.length !== 2) {
    return res.status(400).json({ error: 'Missing required field: point ([lng,lat])' });
  }

  const [lng, lat] = point;
  if (typeof lng !== 'number' || typeof lat !== 'number') {
    return res.status(400).json({ error: 'point deve contenere numeri: [lng, lat]' });
  }

  const pointWKT = `POINT(${lng} ${lat})`;

  try {
    // Cerca la prima zona che contiene il punto e restituisce anche il nome del comune
    const result = await prisma.$queryRaw`
      SELECT c.citta as nome_comune FROM zone z
      JOIN comuni c ON z.comune = c.istat
      WHERE ST_Covers(ST_SetSRID(z.poligono, 4326), ST_GeomFromText(${pointWKT}, 4326))
      LIMIT 1
    `;
    if (result.length > 0) {
      return res.json({ contains: true, comune: result[0].nome_comune });
    } else {
      return res.json({ contains: false, comune: null });
    }
  } catch (err) {
    res.status(500).json({ error: 'Errore nella verifica del punto' });
  }
};