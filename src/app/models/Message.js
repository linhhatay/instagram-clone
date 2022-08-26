const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        conversation: { type: mongoose.Types.ObjectId, ref: 'Conversation' },
        sender: { type: mongoose.Types.ObjectId, ref: 'User' },
        recipient: { type: mongoose.Types.ObjectId, ref: 'User' },
        text: {
            type: 'string',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Message', Message);
