// backend/routes/applyRoutes.js
const express = require('express');
const router = express.Router();
const ApplyController = require('../controllers/ApplyController'); // Menggunakan ApplyController
const auth = require('../middleware/auth'); 
const upload = require('../middleware/upload'); 

// Rute POST untuk mengirim lamaran
router.post('/', auth, upload.single('cv'), ApplyController.submit);

module.exports = router;