const express = require('express');

const router = express.Router();
const teachersController = require('../controllers/teachers');

// EJS VIEW
router.get('/teachers', teachersController.getAllTeachers);

// ---------------------------------------------------------------------------------

// CMS
router.get('/teachersGetCMS', teachersController.getAllTeachersCMS);

router.post('/teachers', teachersController.createTeacher);
// make controller, add auth

// router.get('/admin/teachers/:id', teachersController.showTeacher); // make this controller, add auth // add auth
// router.delete('teachers/:id', teachersController.removeTeacher); // make controller, add auth

module.exports = router;
