const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');
const middlewareController = require('../app/controllers/MiddlewareController');

router.get('/', UserController.getUsers);
router.get('/search', UserController.search);
router.get('/:username', UserController.getAnUser);
router.patch('/edit', UserController.update);
router.patch('/:id/follow', UserController.follow);
router.patch('/:id/unfollow', UserController.unfollow);

module.exports = router;
