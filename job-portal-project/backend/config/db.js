// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Membuat koneksi pool agar efisien untuk banyak pengguna
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10
});

// Mengecek koneksi saat server pertama kali jalan
const promisePool = pool.promise();
promisePool.query('SELECT 1 + 1 AS result')
  .then(() => console.log('Koneksi Database MySQL/MariaDB Berhasil ✅'))
  .catch(err => console.error('Koneksi Gagal ❌:', err.message));

module.exports = promisePool;