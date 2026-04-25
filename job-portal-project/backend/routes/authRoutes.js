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
const { authValidation, jobValidation, applyValidation, companyValidation } = require('../middleware/validator');

// --- AUTH & PROFILE ---
router.post('/register', authValidation, authController.register);
router.post('/login', authController.login);
router.get('/profile', auth, ProfileController.show);
router.post('/profile', auth, ProfileController.upsert);

// --- JOB EXPLORATION & MODERATION ---
router.get('/jobs', JobController.index);
router.delete('/admin/jobs/:id', auth, JobController.moderateDelete);

// --- APPLY & FAVORITE ---
router.post('/apply', [auth, applyValidation], ApplyController.submit);
router.post('/favorites', auth, ApplyController.saveFavorite);

// --- HRD ---
router.post('/hrd/jobs', [auth, jobValidation], HRDController.createJob);
router.put('/hrd/status', auth, HRDController.updateStatus);

// --- ADMIN & STATS ---
router.put('/company/profile', [auth, companyValidation], AdminController.updateCompany);
router.get('/admin/stats', auth, AdminController.getStats);

module.exports = router;