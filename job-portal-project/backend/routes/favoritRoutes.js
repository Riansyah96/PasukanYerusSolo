const express = require('express');
const router = express.Router();
const favoritController = require('../controllers/favoritController');
const { verifyToken } = require('../middleware/auth'); // Pastikan middleware auth terpasang

// Jika di server.js sudah app.use('/api', favoritRoutes), 
// maka path di sini cukup '/favorit'
router.post('/favorit', verifyToken, favoritController.tambahFavorit);
router.get('/favorit', verifyToken, favoritController.getDaftarFavorit);

module.exports = router;