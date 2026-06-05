// routes/favoritRoutes.js
const express = require('express');
const router = express.Router();
const favoritController = require('../controllers/favoritController');
const auth = require('../middleware/auth');

router.get('/', auth, favoritController.getDaftarFavorit);

router.post('/', auth, favoritController.tambahFavorit);

router.delete('/:id_lowongan', auth, favoritController.hapusFavorit);

router.get('/cek/:id_lowongan', auth, favoritController.cekFavorit);

module.exports = router;