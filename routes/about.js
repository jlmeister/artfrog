const express = require('express');

const router = express.Router();
const boardController = require('../controllers/about');

router.get('/about', boardController.getBoardMembers);

// ---------------------------------------------------------------------------------

// CMS
router.get('/teachers/getBoardCMS', boardController.getBoardCMS);

router.post('/about', boardController.createBoardMember);

router.put('/about', boardController.editBoardMember);

router.delete('/about', boardController.deleteBoardMember);

module.exports = router;
