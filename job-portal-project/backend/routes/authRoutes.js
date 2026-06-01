const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

// --- AUTHENTICATION (Rian) ---
router.post('/register', authController.register);
router.post('/login', authController.login);

// --- LOWONGAN / JOBS (Iqbal & Aby) ---
// Baca semua lowongan (Umum/Log-in)
router.get('/jobs', auth, (req, res) => {
    res.json({ status: "success", message: "Melihat semua lowongan (Tugas Aby)" });
});

// Tambah lowongan (Hanya Perusahaan)
router.post('/hrd/jobs', auth, authorize('Perusahaan'), (req, res) => {
    res.json({ status: "success", message: "Lowongan berhasil dibuat (Tugas Iqbal)" });
});

// Hapus lowongan (Hanya Perusahaan/Admin)
router.delete('/hrd/jobs/:id', auth, authorize('Perusahaan'), (req, res) => {
    res.json({ status: "success", message: "Lowongan berhasil dihapus (Tugas Aby/Moderasi)" });
});

// --- LAMARAN (Umar) ---
// Kirim lamaran + Upload CV (Hanya Pelamar)
router.post('/apply', auth, authorize('Pelamar'), upload.single('cv'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: "fail", message: "File CV wajib diupload" });
    }
    res.json({ 
        status: "success", 
        message: "Lamaran terkirim (Tugas Umar)",
        file_path: `/uploads/${req.file.filename}`
    });
});

// --- BRANDING (Syahid) ---
// Update Profil Perusahaan + Logo
router.put('/company/profile', auth, authorize('Perusahaan'), upload.single('logo'), (req, res) => {
    res.json({ status: "success", message: "Profil & Logo diperbarui (Tugas Syahid)" });
});

module.exports = router;