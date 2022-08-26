const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

class MessageController {
    async create(req, res) {
        try {
            const { recipient, sender, text } = req.body;
            if (!recipient || !text) return;
            const newConversation = await Conversation.findOneAndUpdate(
                {
                    $or: [{ recipients: [sender, recipient] }, { recipients: [recipient, sender] }],
                },
                { recipients: [sender, recipient], text },
                { new: true, upsert: true },
            );

            const newMessage = new Message({
                conversation: newConversation._id,
                sender,
                recipient,
                text,
            });

            await newMessage.save();

            res.json({ newConversation });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async getConversation(req, res) {
        try {
            const features = new APIfeatures(
                Conversation.find({
                    recipients: req.body.user,
                }),
                req.query,
            ).paginating();

            const conversations = await features.query
                .sort('-updatedAt')
                .populate('recipients', 'avatar username fullname');

            res.json({
                conversations,
                result: conversations.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
    async getMessages(req, res) {
        try {
            const features = new APIfeatures(
                Message.find({
                    $or: [
                        { sender: req.body.user, recipient: req.params.id },
                        { sender: req.params.id, recipient: req.body.user },
                    ],
                }),
                req.query,
            ).paginating();

            const messages = await features.query.sort({ createdAt: -1 });

            res.json({
                messages,
                result: messages.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new MessageController();
