const User = require('../models/User');

class UserController {
    async getUsers(req, res) {
        try {
            const users = await User.find({}).populate('posts following');
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async getAnUser(req, res) {
        try {
            const user = await User.findOne({ username: req.params.username })
                .select('-password')
                .populate('followers following posts', '-password')
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'author',
                    },
                })
                .populate({
                    path: 'posts',
                    populate: {
                        path: 'comments',
                        populate: 'author',
                    },
                });
            if (!user) return res.status(400).json({ msg: 'User does not exist' });
            res.json({ user });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async update(req, res) {
        try {
            const { id, avatar, fullname, username, bio, email, gender } = req.body;
            const newUser = await User.findByIdAndUpdate(
                { _id: id },
                { avatar, fullname, username, bio, email, gender },
                { new: true },
            );

            res.status(200).json({ msg: 'Updated succesfully', newUser });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async search(req, res) {
        try {
            const users = await User.find({ username: { $regex: req.query.username } })
                .limit(10)
                .select('fullname username avatar');

            res.json({ users });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async follow(req, res) {
        try {
            const user = await User.find({ _id: req.params.id, followers: req.body.user._id });
            if (user.length > 0) return res.status(500).json({ msg: 'You followed this user.' });

            const newUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { followers: req.body.user._id },
                },
                { new: true },
            ).populate('followers following', '-password');

            await User.findOneAndUpdate(
                { _id: req.body.user._id },
                {
                    $push: { following: req.params.id },
                },
                { new: true },
            );

            res.json({ newUser });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async unfollow(req, res) {
        try {
            const newUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { followers: req.body.user._id },
                },
                { new: true },
            ).populate('followers following', '-password');

            await User.findOneAndUpdate(
                { _id: req.body.user._id },
                {
                    $pull: { following: req.params.id },
                },
                { new: true },
            );

            res.json({ newUser });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

module.exports = new UserController();
