const express = require('express');

const router = express.Router();
const createTeacherController = require('../controllers/createTeacher');

router.post('/createTeacher', createTeacherController.createTeacher);

module.exports = router;
