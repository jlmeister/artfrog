const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');

router.get('/teachers', teachersController.list);
router.post('/teachers', express.urlencoded(), teachersController.add);

module.exports = router;