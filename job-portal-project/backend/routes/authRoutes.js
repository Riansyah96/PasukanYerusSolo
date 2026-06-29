
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');
const HRDController = require('../controllers/HRDController');
const applicationController = require('../controllers/applicationController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);

router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, upload.fields([
    { name: 'foto', maxCount: 1 }
]), authController.updateProfile);

router.get('/jobs', auth, authController.getAllJobs);
router.post('/hrd/jobs', auth, authorize('Perusahaan'), authController.createJob);
router.get('/hrd/jobs', auth, authorize('Perusahaan'), HRDController.getMyJobs);
router.delete('/hrd/jobs/:id', auth, authorize('Perusahaan'), authController.deleteJob);

router.get('/hrd/applications', auth, authorize('Perusahaan'), HRDController.getApplications);
router.patch('/hrd/lamaran/:id', auth, authorize('Perusahaan'), applicationController.updateStatus);

router.post('/apply', auth, authorize('Pelamar'), upload.single('cv'), authController.applyJob);

router.put('/company/profile', auth, authorize('Perusahaan'), upload.single('logo'), authController.updateCompanyProfile);
router.get('/company/profile', auth, authorize('Perusahaan'), authController.getCompanyProfile);

module.exports = router;