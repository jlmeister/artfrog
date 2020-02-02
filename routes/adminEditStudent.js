const express = require('express');

const router = express.Router();
const adminEditStudentController = require('../controllers/adminEditStudent');

router.get('/adminEditStudent', adminEditStudentController.editStudent);

module.exports = router;
