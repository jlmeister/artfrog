const express = require('express');

const router = express.Router();
const teachersController = require('../controllers/teachers');

router.get('/teachers', teachersController.getAllTeachers);

router.post('/teachers', teachersController.addNewTeacher);
// make controller, add auth

// router.get('/admin/teachers/:id', teachersController.showTeacher); // make this controller, add auth // add auth
// router.delete('teachers/:id', teachersController.removeTeacher); // make controller, add auth

module.exports = router;
