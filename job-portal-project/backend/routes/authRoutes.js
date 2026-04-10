const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const JobController = require('../controllers/JobController');
const ProfileController = require('../controllers/ProfileController'); // Import Baru
const authMiddleware = require('../middleware/auth');

// --- AUTH ---
router.post('/register', authController.register);
router.post('/login', authController.login);

// --- LOWONGAN (Tugas Anggota 2 & 3) ---
router.get('/jobs', JobController.index);
router.post('/jobs', authMiddleware, JobController.store);
router.put('/jobs/:id', authMiddleware, JobController.update);
router.delete('/jobs/:id', authMiddleware, JobController.destroy);

// --- PROFIL (Tugas Anggota 4) ---
router.get('/profile', authMiddleware, ProfileController.show);
router.post('/profile', authMiddleware, ProfileController.upsert);

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