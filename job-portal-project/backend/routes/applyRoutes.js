
const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth'); 
const upload = require('../middleware/upload'); 

router.post('/', auth, upload.single('cv'), applicationController.applyJob);

router.get('/', auth, applicationController.getUserApplications);

router.get('/test', auth, (req, res) => {
    res.json({ message: 'Apply route is working!', user: req.user });
});

module.exports = router;