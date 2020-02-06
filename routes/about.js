const express = require('express');

const router = express.Router();
const boardController = require('../controllers/about');

router.get('/about', boardController.getBoardMembers);
// router.get('/admin/board/:id', boardController.showBoardMember); // make controller, add auth
// router.post('/board', boardController.addBoardMember); // make controller, add auth
// router.put('/board/:id', boardController.editBoardMember); // make controller, add auth
// router.delete('/board/:id', boardController.removeBoardMember); // make controller, add auth

module.exports = router;
