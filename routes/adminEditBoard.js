const express = require('express');

const router = express.Router();
const adminEditBoardController = require('../controllers/adminEditBoard');

router.get('/adminEditBoard', adminEditBoardController.editBoard);

module.exports = router;
