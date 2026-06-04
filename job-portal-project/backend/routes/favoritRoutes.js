// routes/favoritRoutes.js
const express = require('express');
const router = express.Router();
const favoritController = require('../controllers/favoritController');
// Pastikan middleware auth sudah di-import jika Anda menggunakan auth
const auth = require('../middleware/auth'); 

// Rute ini akan menjadi /api/favorit karena di server.js sudah menggunakan app.use('/api', favoritRoutes)
router.get('/favorit', auth, favoritController.getDaftarFavorit);
router.post('/favorit', auth, favoritController.tambahFavorit);

module.exports = router;