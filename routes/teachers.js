const express = require('express');

const router = express.Router();
const teachersController = require('../controllers/teachers');

router.get('/teachers', teachersController.getAllTeachers);
router.get('/admin/teachers/:id', teachersController.showTeacher); // make this controller, add auth
router.post('/teachers', teachersController.addTeacher); // add auth
router.put('/teachers/:id', teachersController.editTeacher); // make controller, add auth
router.delete('teachers/:id', teachersController.removeTeacher); // make controller, add auth

module.exports = router;
