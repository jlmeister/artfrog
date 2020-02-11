const express = require('express');

const router = express.Router();
const teachersController = require('../controllers/teachers');

// EJS VIEW
router.get('/teachers', teachersController.getAllTeachers);

// ---------------------------------------------------------------------------------

// CMS
router.get('/teachers/getAllTeachersCMS', teachersController.getAllTeachersCMS);

router.post('/teachers', teachersController.createTeacher);

router.put('/teachers', teachersController.editTeacher);

router.delete('/teachers', teachersController.deleteTeacher);

module.exports = router;
