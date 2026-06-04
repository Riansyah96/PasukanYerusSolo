// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const auth = require('../middleware/auth'); 

// Pastikan semua fungsi ini ada di JobController.js
router.get('/', JobController.index); 
router.post('/', auth, JobController.store); 
router.get('/:id', JobController.show); // Perhatikan: Hanya '/:id'

module.exports = router;