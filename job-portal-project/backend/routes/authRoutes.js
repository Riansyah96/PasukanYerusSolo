const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const JobController = require('../controllers/JobController');

// Routes Autentikasi
router.post('/register', authController.register);
router.post('/login', authController.login);

// Routes Lowongan
router.get('/jobs', JobController.index);
router.post('/jobs', JobController.store);

module.exports = router;