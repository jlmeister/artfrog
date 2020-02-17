const express = require('express');

const router = express.Router();
const boardController = require('../controllers/about');

// EJS View
router.get('/about', boardController.getBoardMembers);

// ---------------------------------------------------------------------------------

// CMS
router.get('/aboutCMS', boardController.getBoardCMS);

router.post('/about', boardController.createBoardMember);

router.put('/about', boardController.editBoardMember);

router.delete('/about', boardController.deleteBoardMember);

// Query
router.get('/aboutQuery', boardController.boardQuery);

module.exports = router;
