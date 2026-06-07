// routes/applyRoutes.js
const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth'); 
const upload = require('../middleware/upload'); 

// POST /api/apply - Kirim lamaran
router.post('/', auth, upload.single('cv'), applicationController.applyJob);

// GET /api/apply - Ambil semua lamaran user
router.get('/', auth, applicationController.getUserApplications);

// Tambahkan route test untuk debugging
router.get('/test', auth, (req, res) => {
    res.json({ message: 'Apply route is working!', user: req.user });
});

module.exports = router;