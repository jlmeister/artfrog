const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classes');

router.get('/classes', classesController.getAllClasses);
router.post('/classes', classesController.addNewClass);

module.exports = router;