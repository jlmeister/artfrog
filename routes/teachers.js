const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');

router.get('/teacher', teachersController.list);
router.post('/api/teacher', express.urlencoded(), teachersController.add);

module.exports = router;