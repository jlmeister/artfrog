const express = require('express');

const router = express.Router();
const adminLandingController = require('../controllers/adminLanding');

router.get('/adminLanding', adminLandingController.getLandingPage);

module.exports = router;
