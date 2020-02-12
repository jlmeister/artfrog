const express = require('express');

const router = express.Router();
const studentsController = require('../controllers/students');

router.get('/students', studentsController.getAllStudents);

router.put('/students', studentsController.editStudent);

router.delete('/students', studentsController.deleteStudent);

module.exports = router;
