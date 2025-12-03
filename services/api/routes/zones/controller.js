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
    console.error('checkPointInZone error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nella verifica del punto', details: err.message });
  }
};

// Elimina zone per id singolo o array di id
exports.deleteZones = async (req, res) => {
  if (req.userToken.type !== 'comune' || typeof req.userToken.comune !== 'number') {
    return res.status(403).json({ error: 'Accesso riservato ai comuni autenticati' });
  }

  let { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'id (singolo o array) richiesto' });
  }

  // Permetti sia id singolo che array di id
  if (!Array.isArray(id)) {
    id = [id];
  }
  if (id.length === 0) {
    return res.status(400).json({ error: 'id deve essere un array non vuoto' });
  }

  try {
    const result = await prisma.$executeRaw`
      DELETE FROM zone WHERE id = ANY(${id}) AND comune = ${req.userToken.comune}
    `;
    if (result === 0 || result.rowCount === 0) {
      return res.status(404).json({ message: 'Nessuna zona trovata con gli id richiesti' });
    }
    return res.status(200).json({ message: 'Zone eliminate' });
  } catch (err) {
    console.error('deleteZones error:', err.stack);
    return res.status(500).json({ success: false, error: "Errore nell'eliminazione delle zone", details: err.message });
  }
};

// Zone vicine a un punto
exports.getZonesNearPoint = async (req, res) => {

  const { lng, lat, distance } = req.body;

  if (typeof lng !== 'number' || typeof lat !== 'number' || typeof distance !== 'number') {
    return res.status(400).json({ error: 'lng, lat e distance devono essere numeri (distance in metri)' });
  }

  const pointWKT = `POINT(${lng} ${lat})`;

  try {
    const result = await prisma.$queryRaw`
      SELECT z.id, c.citta as comune, z.tipologia
      FROM zone z
      JOIN comuni c ON z.comune = c.istat
      WHERE ST_DWithin(
        z.poligono::geography,
        ST_GeomFromText(${pointWKT}, 4326)::geography,
        ${distance}
      )
    `;
    return res.json({ zones: result });
  } catch (err) {
    console.error('getZonesNearPoint error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nel recupero delle zone vicine', details: err.message });
  }
};

// Restituisce tutti gli id delle zone del comune autenticato
exports.getZoneIdsByComune = async (req, res) => {
  if (req.userToken.type !== 'comune' || typeof req.userToken.comune !== 'number') {
    return res.status(403).json({ error: 'Accesso riservato ai comuni autenticati' });
  }
  try {
    const result = await prisma.$queryRaw`
      SELECT id FROM zone WHERE comune = ${req.userToken.comune}
    `;
    return res.json({ ids: result.map(z => z.id) });
  } catch (err) {
    console.error('getZoneIdsByComune error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nel recupero degli id delle zone', details: err.message });
  }
};

// Restituisce i punti geometrici di una zona dato l'id
exports.getZoneGeometryById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'id zona non valido' });
  }
  try {
    const result = await prisma.$queryRaw`
      SELECT ST_AsGeoJSON(poligono) as geometry FROM zone WHERE id = ${id}
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: 'Zona non trovata' });
    }
    return res.json({ geometry: JSON.parse(result[0].geometry) });
  } catch (err) {
    console.error('getZoneGeometryById error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nel recupero della geometria della zona', details: err.message });
  }
};