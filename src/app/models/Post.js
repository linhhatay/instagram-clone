const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        content: {
            type: 'string',
            require: true,
        },
        location: {
            type: 'string',
            require: true,
        },
        image: {
            type: 'string',
            require: true,
        },
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        author: { type: mongoose.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Post', Post);
