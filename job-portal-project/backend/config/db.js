const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Task: Uji koneksi database (test query sederhana) sesuai materi
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Koneksi Database Gagal ❌:', err.stack);
  } else {
    console.log('Koneksi Database Berhasil ✅. Waktu Server:', res.rows[0].now);
  }
});

module.exports = pool;