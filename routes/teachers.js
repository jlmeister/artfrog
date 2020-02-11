const express = require('express');

const router = express.Router();
const teachersController = require('../controllers/teachers');

// EJS VIEW
router.get('/teachers', teachersController.getAllTeachers);

// ---------------------------------------------------------------------------------

// CMS
router.get('/teachers/getAllTeachersCMS', teachersController.getAllTeachersCMS);

router.post('/teachers/createTeacher', teachersController.createTeacher);

router.put('/teachers/editTeacher', teachersController.editTeacher);

router.delete('/teachers/deleteTeacher', teachersController.deleteTeacher);

module.exports = router;
