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

`const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const JobController = require('../controllers/JobController');
const authMiddleware = require('../middleware/auth');

// Endpoint Autentikasi
router.post('/register', authController.register);
router.post('/login', authController.login);

// Endpoint Lowongan Kerja (CRUD)
router.get('/jobs', JobController.index); // Siapa saja bisa melihat
router.post('/jobs', authMiddleware, JobController.store); // Harus login untuk posting
router.put('/jobs/:id', authMiddleware, JobController.update); // Harus login untuk edit
router.delete('/jobs/:id', authMiddleware, JobController.destroy); // Harus login untuk hapus

module.exports = router;`