const Comment = require('../models/Comment');
const Post = require('../models/Post');

class CommentController {
    async create(req, res) {
        try {
            const newComment = await new Comment({
                author: req.body.author,
                postId: req.body.postId,
                content: req.body.content,
            });

            await Post.findByIdAndUpdate(
                { _id: req.body.postId },
                {
                    $push: { comments: newComment._id },
                },
                { new: true },
            )
                .populate('author')
                .exec();

            await newComment.save();

            res.status(200).json(newComment);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async get(req, res) {
        try {
            const comments = await Comment.find({}).populate('author', '_id fullname username avatar');
            res.status(200).json({ comments });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async remove(req, res) {
        try {
            await Comment.findByIdAndDelete(req.params.id);

            await Post.findByIdAndUpdate(
                { _id: req.body.postId },
                {
                    $pull: { comments: req.params.id },
                },
                { new: true },
            );
            res.status(200).json('Delete succesfully');
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

module.exports = new CommentController();
