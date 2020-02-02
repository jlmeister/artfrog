const express = require('express');

const router = express.Router();
const adminEditTeacherController = require('../controllers/adminEditTeacher');

router.get('/adminEditTeacher', adminEditTeacherController.editTeacher);

module.exports = router;
