const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');

router.get('/teachers', teachersController.getAllTeachers);
router.post('/teachers', teachersController.addNewTeacher);

module.exports = router;