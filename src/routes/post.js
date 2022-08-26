const express = require('express');
const router = express.Router();

const PostController = require('../app/controllers/PostController');

router.get('/', PostController.get);
router.post('/create', PostController.create);
router.delete('/delete/:id', PostController.delete);
router.patch('/update/:id', PostController.update);
router.patch('/like/:id', PostController.like);
router.patch('/unlike/:id', PostController.unlike);

module.exports = router;
