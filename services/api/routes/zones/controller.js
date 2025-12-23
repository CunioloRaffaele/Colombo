const prisma = require('../../utils/prisma');

const { isValidCoordinatesArray } = require('../../utils/coordinates');

// Salva zona
exports.saveZone = async (req, res) => {
  if (req.userToken.type !== 'comune' || typeof req.userToken.comune !== 'number') {
    return res.status(403).json({ error: 'Accesso riservato ai comuni autenticati' });
  }

  const comune = req.userToken.comune;
  const { coordinates, tipologia } = req.body;

  // Now expect coordinates as [lat, lng]
  if (!Array.isArray(coordinates) || coordinates.length < 3 || !coordinates.every(c => Array.isArray(c) && c.length === 2 && typeof c[0] === 'number' && typeof c[1] === 'number')) {
    return res.status(400).json({ error: 'coordinates deve essere un array di almeno 3 coppie [lat, lng] numeriche' });
  }

  // Chiude il poligono se necessario
  const coords = [...coordinates];
  if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
    coords.push(coords[0]);
  }

  // Build WKT as POLYGON((lng lat, ...))
  const poligonoWKT = `POLYGON((${coords.map(c => `${c[1]} ${c[0]}`).join(', ')}))`;

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
  // Prendi lat e lng dai parametri URL
  const lat = Number(req.params.lat);
  const lng = Number(req.params.lng);
  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ error: 'lat e lng devono essere numeri' });
  }

  // Build WKT as POINT(lng lat)
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

  // Expect { lat, lng, distance }
  const { lat, lng, distance } = req.body;

  if (typeof lat !== 'number' || typeof lng !== 'number' || typeof distance !== 'number') {
    return res.status(400).json({ error: 'lat, lng e distance devono essere numeri (distance in metri)' });
  }

  // Build WKT as POINT(lng lat)
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

// Restituisce tutte le geometrie di un istat specifico (usato per mappa app client)
exports.getZonesByComune = async (req, res) => {
  const istat = parseInt(req.params.istat);
  if (!istat) {
    return res.status(400).json({ error: 'istat comune richiesto' });
  }

  try {
    // Verifica se l'utente risiede in un comune registrato
    const userEmail = req.userToken.email;
    
    // Recupera la residenza dell'utente
    const user = await prisma.cittadini.findUnique({
      where: { email: userEmail },
      select: { residenza: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Controlla se il comune di residenza è registrato
    const comuneRegistrato = await prisma.comuni_registrati.findUnique({
      where: { comune: user.residenza }
    });

    if (!comuneRegistrato) {
      return res.status(403).json({ error: 'Il tuo comune di residenza non è registrato alla piattaforma. Non è possibile visualizzare le zone' });
    }
    /*
    if (user.residenza !== istat) {
       return res.status(403).json({ error: 'Puoi visualizzare solo le zone del tuo comune di residenza' });
    }
    */

    const result = await prisma.$queryRaw`
      SELECT id, ST_AsGeoJSON(poligono) as geometry, tipologia FROM zone WHERE comune = ${istat}
    `;
    const zones = result.map(z => ({
      id: z.id,
      geometry: JSON.parse(z.geometry),
      tipologia: z.tipologia
    }));
    return res.json({ zones });
  } catch (err) {
    console.error('getZonesByComune error:', err.stack);
    return res.status(500).json({ success: false, error: 'Errore nel recupero delle zone del comune', details: err.message });
  }
};
