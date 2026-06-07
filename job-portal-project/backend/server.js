require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const favoritRoutes = require('./routes/favoritRoutes');
const applyRoutes = require('./routes/applyRoutes');
const lamaranRoutes = require('./routes/lamaranRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/favorit', favoritRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api/lamaran', lamaranRoutes);

// Tambahkan route untuk HRD
app.get('/api/hrd/applications', async (req, res) => {
    try {
        // Ini hanya contoh, nanti akan diintegrasikan dengan auth
        const [rows] = await pool.query(`
            SELECT l.id_lamaran, l.id_lowongan, l.pesan_tambahan, l.status, l.tanggal_melamar,
                   low.judul_posisi, low.kategori, low.tipe_pekerjaan, low.gaji,
                   u.nama as nama_pelamar, u.email as email_pelamar, u.telepon
            FROM lamaran l
            JOIN lowongan low ON l.id_lowongan = low.id_lowongan
            JOIN users u ON l.id_user = u.id_user
            ORDER BY l.tanggal_melamar DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error('Get HRD applications error:', err);
        res.status(500).json({ message: 'Gagal mengambil data lamaran' });
    }
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});