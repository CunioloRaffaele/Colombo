require('dotenv').config({ path: '.env.postgis' });
const { Pool } = require('pg');

const pool = new Pool({
 connectionString: process.env.POSTGIS_URL,
});

module.exports = { pool };