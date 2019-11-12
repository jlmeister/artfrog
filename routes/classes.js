const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classes');

router.get('/classes', classesController.list);
router.post('/api/classes', express.urlencoded(), classesController.add);

module.exports = router;