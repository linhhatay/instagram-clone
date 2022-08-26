const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const MiddlewareController = require('../app/controllers/MiddlewareController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh_token', authController.generateAccessToken);

module.exports = router;
