const express = require('express');

const router = express.Router();
const adminLandingController = require('../controllers/adminLanding');

router.get('/adminLanding', adminLandingController.getAllClasses);

router.get('/adminLanding', adminLandingController.getAllTeachers);

module.exports = router;
