// routes/lamaranRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

// GET /api/lamaran - Mendapatkan semua lamaran user yang login
router.get('/', auth, async (req, res) => {
    try {
        const userId = req.user.id_user;
        
        const [rows] = await pool.query(
            `SELECT l.id_lamaran, l.id_lowongan, l.pesan_tambahan, l.status, l.tanggal_melamar,
                    low.judul_posisi, low.kategori, low.tipe_pekerjaan, low.gaji,
                    u.nama as nama_perusahaan
             FROM lamaran l
             JOIN lowongan low ON l.id_lowongan = low.id_lowongan
             LEFT JOIN users u ON low.id_perusahaan = u.id_user
             WHERE l.id_user = ?
             ORDER BY l.tanggal_melamar DESC`,
            [userId]
        );
        
        res.json(rows);
    } catch (err) {
        console.error('Get lamaran error:', err);
        res.status(500).json({ message: 'Gagal mengambil data lamaran' });
    }
});

// GET /api/lamaran/hrd - Mendapatkan semua lamaran untuk HRD (perusahaan)
router.get('/hrd', auth, async (req, res) => {
    try {
        const perusahaanId = req.user.id_user;
        
        const [rows] = await pool.query(
            `SELECT l.id_lamaran, l.id_lowongan, l.pesan_tambahan, l.status, l.tanggal_melamar,
                    low.judul_posisi, low.kategori, low.tipe_pekerjaan, low.gaji,
                    u.nama as nama_pelamar, u.email as email_pelamar, u.telepon
             FROM lamaran l
             JOIN lowongan low ON l.id_lowongan = low.id_lowongan
             JOIN users u ON l.id_user = u.id_user
             WHERE low.id_perusahaan = ?
             ORDER BY l.tanggal_melamar DESC`,
            [perusahaanId]
        );
        
        res.json(rows);
    } catch (err) {
        console.error('Get HRD lamaran error:', err);
        res.status(500).json({ message: 'Gagal mengambil data lamaran' });
    }
});

// PATCH /api/lamaran/:id - Update status lamaran (untuk HRD)
router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Validasi status
        const validStatus = ['Menunggu', 'Review', 'Interview', 'Lolos', 'Gagal'];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: 'Status tidak valid' });
        }
        
        await pool.query(
            'UPDATE lamaran SET status = ? WHERE id_lamaran = ?',
            [status, id]
        );
        
        res.json({ status: 'success', message: 'Status lamaran diperbarui' });
    } catch (err) {
        console.error('Update status error:', err);
        res.status(500).json({ message: 'Gagal memperbarui status' });
    }
});

module.exports = router;