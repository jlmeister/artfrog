const express = require('express');

const router = express.Router();
const classesController = require('../controllers/classes');

// EJS Views
router.get('/classes', classesController.getAllClasses);

// CMS
router.get('/classesCMS', classesController.getAllClassesCMS);

router.post('/classes', classesController.createClass);

router.put('/classes', classesController.editClass);

router.delete('/classes', classesController.deleteClass);

// Query
router.get('/classesQuery', classesController.classesQuery);


module.exports = router;
