require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const favoritRoutes = require('./routes/favoritRoutes');
const applyRoutes = require('./routes/applyRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(cors());
app.use(express.json());

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes - Konsistensi prefix
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/favorit', favoritRoutes);
app.use('/api/apply', applyRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server aktif di port ${PORT}`);
    console.log(`Koneksi Database Berhasil ✅`);
});