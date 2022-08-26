const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: {
            type: 'string',
            required: true,
            unique: true,
        },
        fullname: {
            type: 'string',
            required: true,
        },
        username: {
            type: 'string',
            required: true,
            unique: true,
        },
        password: {
            type: 'string',
            required: true,
            minlength: 6,
        },
        avatar: {
            type: 'string',
            default: '',
        },
        website: {
            type: 'string',
            default: '',
        },
        bio: {
            type: 'string',
            default: 'Prefer not to say',
        },
        gender: {
            type: 'string',
            default: 'Prefer not to say',
        },
        role: {
            type: 'string',
            default: 'user',
        },
        posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
        followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
