
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.use(auth, authorize('Admin'));

router.get('/stats', adminController.getStats);

router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

router.get('/jobs', adminController.getAllJobs);
router.put('/jobs/:id', adminController.updateJob);  // <-- Tambah route update job
router.delete('/jobs/:id', adminController.deleteJob);

router.get('/applications', adminController.getAllApplications);
router.patch('/applications/:id', adminController.updateApplicationStatus);

router.get('/testimonials', adminController.getAllTestimonials);
router.put('/testimonials/:id', adminController.updateTestimonial);
router.delete('/testimonials/:id', adminController.deleteTestimonial);

module.exports = router;