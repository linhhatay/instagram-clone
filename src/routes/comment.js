const express = require('express');
const router = express.Router();

const CommentController = require('../app/controllers/CommentController');

router.post('/create', CommentController.create);
router.get('/:id', CommentController.get);
router.patch('/:id/delete', CommentController.remove);

module.exports = router;
