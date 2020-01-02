const express = require('express');

const router = express.Router();
const adminEditClassController = require('../controllers/adminEditClass');

router.get('/adminEditClass', adminEditClassController.editClass);

module.exports = router;
