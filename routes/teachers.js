const express = require('express');

const router = express.Router();
const teachersController = require('../controllers/teachers');

// EJS VIEW
router.get('/teachers', teachersController.getAllTeachers);

// ---------------------------------------------------------------------------------

// CMS
router.get('/teachersCMS', teachersController.getAllTeachersCMS);

router.post('/teachers', teachersController.createTeacher);

router.put('/teachers', teachersController.editTeacher);

router.delete('/teachers', teachersController.deleteTeacher);

// Query
router.get('/teachersQuery', teachersController.teachersQuery);


module.exports = router;
