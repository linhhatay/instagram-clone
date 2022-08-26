const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Conversation = new Schema(
    {
        recipients: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        text: {
            type: 'string',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Conversation', Conversation);
