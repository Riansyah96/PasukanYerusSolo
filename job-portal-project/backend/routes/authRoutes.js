// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

// --- AUTHENTICATION ---
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);

// --- LOWONGAN / JOBS ---
// Baca semua lowongan (Umum/Log-in)
router.get('/jobs', auth, authController.getAllJobs);

// Tambah lowongan (Hanya Perusahaan)
router.post('/hrd/jobs', auth, authorize('Perusahaan'), authController.createJob);

// Hapus lowongan (Hanya Perusahaan/Admin)
router.delete('/hrd/jobs/:id', auth, authorize('Perusahaan'), authController.deleteJob);

// --- LAMARAN ---
// Kirim lamaran + Upload CV (Hanya Pelamar)
router.post('/apply', auth, authorize('Pelamar'), upload.single('cv'), authController.applyJob);

// --- BRANDING ---
// Update Profil Perusahaan + Logo
router.put('/company/profile', auth, authorize('Perusahaan'), upload.single('logo'), authController.updateCompanyProfile);

// --- PROFILE ---
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, upload.fields([{ name: 'foto' }, { name: 'cv' }]), authController.updateProfile);

module.exports = router;