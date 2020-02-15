const express = require('express');

const router = express.Router();
const classesController = require('../controllers/classes');

router.get('/classes', classesController.getAllClasses);

// CMS
router.get('/classesCMS', classesController.getAllClassesCMS);

router.post('/classes', classesController.createClass);

router.put('/classes', classesController.editClass);

router.delete('/classes', classesController.deleteClass);

module.exports = router;
