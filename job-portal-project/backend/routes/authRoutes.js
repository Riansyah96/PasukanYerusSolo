// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');
const HRDController = require('../controllers/HRDController');
const applicationController = require('../controllers/applicationController');

// --- AUTHENTICATION ---
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);

// --- PROFILE ROUTES ---
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, upload.fields([
    { name: 'foto', maxCount: 1 }
]), authController.updateProfile);

// --- LOWONGAN / JOBS ---
router.get('/jobs', auth, authController.getAllJobs);
router.post('/hrd/jobs', auth, authorize('Perusahaan'), authController.createJob);
router.delete('/hrd/jobs/:id', auth, authorize('Perusahaan'), authController.deleteJob);

// --- HRD APPLICATIONS ---
router.get('/hrd/applications', auth, authorize('Perusahaan'), HRDController.getApplications);
router.patch('/hrd/lamaran/:id', auth, authorize('Perusahaan'), applicationController.updateStatus);

// --- LAMARAN ---
router.post('/apply', auth, authorize('Pelamar'), upload.single('cv'), authController.applyJob);

// --- BRANDING ---
router.put('/company/profile', auth, authorize('Perusahaan'), upload.single('logo'), authController.updateCompanyProfile);

module.exports = router;