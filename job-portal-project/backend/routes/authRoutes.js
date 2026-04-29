const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/jobs', auth, (req, res) => {
    res.json({ status: "success", message: "Melihat semua lowongan" });
});

router.post('/hrd/jobs', auth, authorize('Perusahaan'), (req, res) => {
    res.json({ status: "success", message: "Lowongan berhasil dibuat" });
});

router.delete('/hrd/jobs/:id', auth, authorize('Perusahaan'), (req, res) => {
    res.json({ status: "success", message: "Lowongan berhasil dihapus" });
});

router.post('/apply', auth, authorize('Pelamar'), upload.single('cv'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: "fail", message: "File CV wajib diupload" });
    }
    res.json({ 
        status: "success", 
        message: "Lamaran terkirim",
        file_path: `/uploads/${req.file.filename}`
    });
});

router.put('/company/profile', auth, authorize('Perusahaan'), upload.single('logo'), (req, res) => {
    res.json({ status: "success", message: "Profil & Logo diperbarui" });
});

module.exports = router;