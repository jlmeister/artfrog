const express = require('express');
const router = express.Router();
const classesController = require('../controllers/about');

router.get('/about', classesController.getBoardMembers);

module.exports = router;