require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server aktif di port ${PORT}`);
    console.log(`Koneksi Database Berhasil ✅`);
});