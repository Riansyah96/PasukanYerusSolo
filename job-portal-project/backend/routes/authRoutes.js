const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Routes (Contoh Fitur Iqbal - Perusahaan)
router.post('/hrd/jobs', auth, authorize('Perusahaan'), (req, res) => {
    res.json({ message: "Berhasil masuk ke dashboard Perusahaan" });
});

// Contoh Fitur Umar (Upload CV Pelamar)
router.post('/apply', auth, authorize('Pelamar'), upload.single('cv'), (req, res) => {
    // Nama file yang tersimpan: req.file.filename
    res.json({ message: "Lamaran terkirim dengan file: " + req.file.filename });
});

module.exports = router;