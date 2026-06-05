const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth'); 
const upload = require('../middleware/upload'); 

router.post('/', auth, upload.single('cv'), applicationController.applyJob);

module.exports = router;