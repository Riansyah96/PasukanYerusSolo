const express = require('express');
const router = express.Router();
const testimoniController = require('../controllers/testimoniController');
const auth = require('../middleware/auth');

router.get('/', testimoniController.index);
router.post('/', auth, testimoniController.store);

module.exports = router;
