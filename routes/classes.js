const express = require('express');

const router = express.Router();
const classesController = require('../controllers/classes');

router.get('/classes', classesController.getAllClasses);
// router.get('/admin/classes/:id', classesController.showClass); // make this controller, add auth
// router.post('/classes', classesController.addNewClass); // add auth
// router.put('/classes/:id', classesController.editClass); // make this controller, add auth
// router.delete('classes/:id', classesController.removeClass); // make this controller, add auth

module.exports = router;
