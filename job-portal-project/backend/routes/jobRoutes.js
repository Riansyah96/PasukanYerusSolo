const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const auth = require('../middleware/auth'); 

// Endpoint Lowongan
router.get('/', JobController.index);
router.post('/', auth, JobController.store); 

module.exports = router;