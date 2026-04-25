const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Menggunakan Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('API Web Lowongan Kerja PasukanYerusSolo Running...');
});

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});