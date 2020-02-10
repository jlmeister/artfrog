const express = require('express');

const router = express.Router();
const adminEditTeacherController = require('../controllers/adminEditTeacher');

router.get('/adminEditTeacher', adminEditTeacherController.editTeacher);

router.post('/createTeacher', adminEditTeacherController.createTeacher);

router.put('/teachers/:id', adminEditTeacherController.editTeacher);

module.exports = router;
