const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
    async create(req, res) {
        try {
            const newPost = await new Post({
                content: req.body.content,
                location: req.body.location,
                image: req.body.image,
                author: req.body.author,
            });

            await newPost.save();
            await User.findOneAndUpdate(
                { _id: req.body.author },
                {
                    $push: { posts: newPost },
                },
                { new: true },
            );

            res.json({
                msg: 'Create Post',
                newPost,
            });
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }
    // GET POSTS
    async get(req, res) {
        try {
            const posts = await Post.find({})
                .sort({ createdAt: -1 })
                .populate('author', '_id username fullname avatar followers')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'author likes _id',
                    },
                });
            res.status(200).json(posts);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    // UPDATE POST
    async update(req, res) {
        try {
            const updatePost = req.body;
            const post = await Post.findOneAndUpdate({ _id: req.params.id }, updatePost, { new: true }).populate(
                'author',
                '_id username fullname avatar',
            );

            res.status(200).json(post);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    // DELETE POST
    async delete(req, res) {
        try {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json('Delete succesfully');
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    // LIKE POST
    async like(req, res) {
        try {
            const user = req.body.user;
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { likes: user },
                },
                { new: true },
            );
            res.status(200).json('Like succesfully');
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    // UNLIKE POST
    async unlike(req, res) {
        try {
            const user = req.body.user;
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { likes: user },
                },
                { new: true },
            );
            res.status(200).json('Unlike succesfully');
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

module.exports = new PostController();
