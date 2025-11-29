require('dotenv').config({ path: '.env.postgis' }); 
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGIS_URL
});

// helper: valida coordinate array [[lng, lat], ...]
function isValidCoordinatesArray(coords) {
  return Array.isArray(coords) &&
         coords.length >= 3 &&
         coords.every(c => Array.isArray(c) &&
                           c.length === 2 &&
                           typeof c[0] === 'number' &&
                           typeof c[1] === 'number');
}

// Salva zona
exports.saveZone = async (req, res) => {
  if (!req.userToken || req.userToken.type !== 'comune' || typeof req.userToken.comune !== 'number') {
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
    await pool.query(sql, [poligonoWKT, comune, tipologia || 'generica']);
    return res.status(201).json({ message: 'Zona salvata correttamente' });
  } catch (err) {
    console.error('saveZone error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nel salvataggio della zona', details: err.message });
  }
};

// Verifica punto
exports.checkPointInZone = async (req, res) => {
  if (!req.userToken) {
    return res.status(403).json({ error: 'Accesso riservato agli utenti autenticati' });
  }

  const { comune, tipologia, point } = req.body;

  if (typeof comune === 'undefined' || !tipologia || !Array.isArray(point) || point.length !== 2) {
    return res.status(400).json({ error: 'Missing required fields: comune, tipologia, point([lng,lat])' });
  }

  const [lng, lat] = point;
  if (typeof lng !== 'number' || typeof lat !== 'number') {
    return res.status(400).json({ error: 'point deve contenere numeri: [lng, lat]' });
  }

  const pointWKT = `POINT(${lng} ${lat})`;

  try {
    const sql = `
      SELECT EXISTS (
        SELECT 1 FROM zone
        WHERE comune = $2 AND tipologia = $3
          AND ST_Intersects(poligono, ST_GeomFromText($1, 4326))
      ) AS contains;
    `;
    const result = await pool.query(sql, [pointWKT, comune, tipologia]);
    return res.json({ contains: result.rows[0].contains });
  } catch (err) {
    console.error('checkPointInZone error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nella verifica del punto', details: err.message });
  }
};

// Elimina zone
exports.deleteZones = async (req, res) => {
  if (!req.userToken || req.userToken.type !== 'comune' || typeof req.userToken.comune !== 'number') {
    return res.status(403).json({ error: 'Accesso riservato ai comuni autenticati' });
  }

  const comuneId = req.userToken.comune;
  const { tipologie } = req.body;

  if (!Array.isArray(tipologie) || tipologie.length === 0) {
    return res.status(400).json({ error: 'tipologie deve essere un array non vuoto' });
  }

  try {
    const result = await pool.query('DELETE FROM zone WHERE comune = $1 AND tipologia = ANY($2)', [comuneId, tipologie]);
    if (result.rowCount === 0) {
      return res.status(200).json({ message: 'Nessuna zona trovata con la tipologia richiesta' });
    }
    return res.status(200).json({ message: 'Zone eliminate' });
  } catch (err) {
    console.error('deleteZones error:', err.stack);
    return res.status(500).json({ success: false, error: "Errore nell'eliminazione delle zone", details: err.message });
  }
};

// Zone vicine a un punto
exports.getZonesNearPoint = async (req, res) => {
  if (!req.userToken) {
    return res.status(403).json({ error: 'Accesso riservato agli utenti autenticati' });
  }

  const { lng, lat, distance } = req.body;

  if (typeof lng !== 'number' || typeof lat !== 'number' || typeof distance !== 'number') {
    return res.status(400).json({ error: 'lng, lat e distance devono essere numeri (distance in metri)' });
  }

  const pointWKT = `POINT(${lng} ${lat})`;

  try {
    const sql = `
      SELECT comune, tipologia
      FROM zone
      WHERE ST_DWithin(
        poligono::geography,
        ST_GeomFromText($1, 4326)::geography,
        $2
      );
    `;
    const result = await pool.query(sql, [pointWKT, distance]);
    return res.json({ zones: result.rows });
  } catch (err) {
    console.error('getZonesNearPoint error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nel recupero delle zone vicine', details: err.message });
  }
};