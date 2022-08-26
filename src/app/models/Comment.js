const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        content: {
            type: 'string',
            required: true,
        },
        likes: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Comment', Comment);
