const express = require('express');

const router = express.Router();
const adminPanelController = require('../controllers/adminPanel');

router.get('/admin/panel', adminPanelController.getPanelPage);

module.exports = router;
