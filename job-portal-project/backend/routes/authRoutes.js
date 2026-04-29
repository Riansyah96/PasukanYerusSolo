const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/hrd/jobs', auth, authorize('Perusahaan'), (req, res) => {
    res.json({ message: "Berhasil buat lowongan (Tugas Iqbal)" });
});

router.post('/apply', auth, authorize('Pelamar'), upload.single('cv'), (req, res) => {
    res.json({ 
        message: "Berhasil melamar (Tugas Umar)",
        file: req.file ? req.file.filename : "Tidak ada file"
    });
});

router.get('/jobs', auth, (req, res) => {
    res.json({ message: "Daftar lowongan (Tugas Aby)" });
});

module.exports = router;