const express = require('express');
const router = express.Router();

// Import Controller
const authController = require('../controllers/authController');
const ProfileController = require('../controllers/ProfileController');
const JobController = require('../controllers/JobController');
const ApplyController = require('../controllers/ApplyController');
const HRDController = require('../controllers/HRDController');
const AdminController = require('../controllers/AdminController');

// Import Middleware
const auth = require('../middleware/auth');
const { 
    authValidation, 
    jobValidation, 
    applyValidation, 
    companyValidation 
} = require('../middleware/validator');

// --- RIAN: Autentikasi & Profil (Fitur 1, 2, 11) ---
router.post('/register', authValidation, authController.register);
router.post('/login', authController.login);
router.get('/profile', auth, ProfileController.show);
router.post('/profile', auth, ProfileController.upsert);

// --- ABY: Eksplorasi & Moderasi (Fitur 3, 10) ---
router.get('/jobs', JobController.index);
router.get('/jobs/explore', JobController.index);
router.delete('/admin/jobs/:id', auth, JobController.moderateDelete);

// --- UMAR: Manajemen Lamaran & Favorit (Fitur 4, 5) ---
router.post('/apply', [auth, applyValidation], ApplyController.submit);
router.post('/favorites', auth, ApplyController.saveFavorite);

// --- IQBAL: Kelola Lowongan & Seleksi (Fitur 6, 7) ---
router.post('/hrd/jobs', [auth, jobValidation], HRDController.createJob);
router.put('/hrd/status', auth, HRDController.updateStatus);

// --- SYAHID: Branding & Statistik (Fitur 8, 9) ---
router.put('/company/profile', [auth, companyValidation], AdminController.updateCompany);
router.get('/admin/stats', auth, AdminController.getStats);

module.exports = router;