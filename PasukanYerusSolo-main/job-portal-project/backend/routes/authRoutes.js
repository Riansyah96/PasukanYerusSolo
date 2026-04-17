// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import Semua Controller Cukup SEKALI 
const authController = require('../controllers/authController');
const ProfileController = require('../controllers/ProfileController');
const JobController = require('../controllers/JobController');
const ApplyController = require('../controllers/ApplyController');
const HRDController = require('../controllers/HRDController');
const AdminController = require('../controllers/AdminController');
const auth = require('../middleware/auth');

// --- RIAN: Autentikasi & Profil (Fitur 1, 2, 11) --- [cite: 7, 11, 47]
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', auth, ProfileController.show);
router.post('/profile', auth, ProfileController.upsert);

// --- ABY: Eksplorasi & Moderasi (Fitur 3, 10) --- [cite: 15, 43]
router.get('/jobs', JobController.index);
router.delete('/admin/jobs/:id', auth, JobController.moderateDelete);

// --- UMAR: Lamaran & Favorit (Fitur 4, 5) --- [cite: 19, 23]
router.post('/apply', auth, ApplyController.submit);
router.post('/favorites', auth, ApplyController.saveFavorite);

// --- IQBAL: HRD & Seleksi (Fitur 6, 7) --- [cite: 27, 31]
router.post('/hrd/jobs', auth, HRDController.createJob);
router.put('/hrd/status', auth, HRDController.updateStatus);

// --- SYAHID: Branding & Statistik (Fitur 8, 9) --- [cite: 35, 39]
router.put('/company/profile', auth, AdminController.updateCompany);
router.get('/admin/stats', auth, AdminController.getStats);

module.exports = router;

const express = require('express');
const router = express.Router();
const { authValidation, jobValidation, applyValidation } = require('../middleware/validator');
const auth = require('../middleware/auth');

// Gunakan validasi sebelum controller dijalankan
router.post('/register', authValidation, authController.register); // Rian
router.post('/hrd/jobs', [auth, jobValidation], HRDController.createJob); // Iqbal
router.post('/apply', [auth, applyValidation], ApplyController.submit); // Umar

module.exports = router;