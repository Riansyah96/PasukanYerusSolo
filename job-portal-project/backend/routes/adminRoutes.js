// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Semua route admin hanya bisa diakses oleh role 'Admin'
router.use(auth, authorize('Admin'));

// Dashboard
router.get('/stats', adminController.getStats);

// User Management (Pelamar & Perusahaan)
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Job Management
router.get('/jobs', adminController.getAllJobs);
router.delete('/jobs/:id', adminController.deleteJob);

// Application Management
router.get('/applications', adminController.getAllApplications);
router.patch('/applications/:id', adminController.updateApplicationStatus);

module.exports = router;