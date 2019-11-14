const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

router.get('/register', registerController.showForm);
router.post('/register', registerController.register);

module.exports = router;