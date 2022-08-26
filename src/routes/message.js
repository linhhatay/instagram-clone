const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const MessageController = require('../app/controllers/MessageController');

router.post('/create', MessageController.create);
router.post('/conversation', MessageController.getConversation);
router.post('/:id', MessageController.getMessages);

module.exports = router;
