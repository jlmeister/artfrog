const express = require('express');

const router = express.Router();
const studentsController = require('../controllers/students');

router.get('/students/contact', studentsController.showStudent); // make controller, add auth
router.put('/students/:id', studentsController.editStudent); // make controller, add auth
router.delete('/students/:id', studentsController.removeStudent); // make controller, add auth

module.exports = router;
