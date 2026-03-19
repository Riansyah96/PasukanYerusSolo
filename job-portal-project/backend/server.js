const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Cek Koneksi
app.get('/', (req, res) => {
  res.send('API Web Lowongan Kerja Running...');
});

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});