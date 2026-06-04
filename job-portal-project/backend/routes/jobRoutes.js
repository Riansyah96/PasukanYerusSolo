// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const auth = require('../middleware/auth'); 

// Pastikan semua fungsi ini ada di JobController.js
router.get('/', JobController.index); 
router.post('/', auth, JobController.store); // Pastikan JobController.store sudah didefinisikan
router.get('/:id', JobController.show);

module.exports = router;