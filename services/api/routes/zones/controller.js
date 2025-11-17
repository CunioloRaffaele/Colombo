const { Pool } = require('pg');
const protobuf = require('protobufjs');
const path = require('path');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tuo_db',
  password: 'password',
  port: 5432,
});

// Carica il file .proto una volta all'avvio
let SaveZoneResponse, ContainsResponse;
protobuf.load(path.join(__dirname, 'zones.proto')).then(root => {
  SaveZoneResponse = root.lookupType('SaveZoneResponse');
  ContainsResponse = root.lookupType('ContainsResponse');
});

// Salvataggio zona di interesse (array di coordinate, geometria)
exports.saveZone = async (req, res) => {
  const { id_comune, coordinates } = req.body; // coordinates: [[lng, lat], ...]
  if (!id_comune || !coordinates || coordinates.length < 3) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // Chiudi il poligono se necessario
  if (
    coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
    coordinates[0][1] !== coordinates[coordinates.length - 1][1]
  ) {
    coordinates.push(coordinates[0]);
  }
  const polygon = `POLYGON((${coordinates.map(c => c.join(' ')).join(', ')}))`;
  try {
    await pool.query(
      'INSERT INTO area (polygon, id_comune) VALUES (ST_GeomFromText($1, 4326), $2)',
      [polygon, id_comune]
    );
    const payload = { message: 'Zona salvata correttamente' };
    if (req.headers.accept === 'application/x-protobuf') {
      const buffer = SaveZoneResponse.encode(payload).finish();
      res.set('Content-Type', 'application/x-protobuf');
      res.send(buffer);
    } else {
      res.status(201).json(payload);
    }
  } catch (err) {
    res.status(500).json({ error: 'Errore nel salvataggio della zona' });
  }
};

// Verifica se un punto è dentro una zona
exports.checkPointInZone = async (req, res) => {
  const { areaId, point } = req.body; // point: [lng, lat]
  if (!areaId || !point || point.length !== 2) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const pointWKT = `POINT(${point[0]} ${point[1]})`;
  try {
    const result = await pool.query(
      `SELECT ST_Contains(polygon, ST_GeomFromText($1, 4326)) AS contains
       FROM area WHERE id = $2`,
      [pointWKT, areaId]
    );
    const payload = { contains: result.rows[0]?.contains || false };
    if (req.headers.accept === 'application/x-protobuf') {
      const buffer = ContainsResponse.encode(payload).finish();
      res.set('Content-Type', 'application/x-protobuf');
      res.send(buffer);
    } else {
      res.json(payload);
    }
  } catch (err) {
    res.status(500).json({ error: 'Errore nella verifica del punto' });
  }
};