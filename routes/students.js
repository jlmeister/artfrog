const express = require('express');

const router = express.Router();
const studentsController = require('../controllers/students');


// CMS Only
router.get('/students', studentsController.getAllStudents);

router.get('/studentsQuery', studentsController.studentsQuery);

router.put('/students', studentsController.editStudent);

router.delete('/students', studentsController.deleteStudent);

// Query
router.get('/studentsQuery', studentsController.studentsQuery);

module.exports = router;

// Accept query parameter passed into getAllStudents - limit amount
// Lodash.js throttle only invokes function once or so often Look at seach complete
// Also look at debounce
// Also limit search
