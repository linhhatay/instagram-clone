const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GENERATE ACCESS TOKEN
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
        expiresIn: '1d',
    });
};

// GENARATE REFRESH TOKEN
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
        expiresIn: '30d',
    });
};

class AuthController {
    // REGISTER
    async register(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                email: req.body.email,
                fullname: req.body.fullname,
                username: req.body.username.toLowerCase().replace(/ /g, ''),
                password: hashed,
            });

            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshToken({ id: newUser._id });

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/v1/auth/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            await newUser.save();

            res.status(200).json({
                msg: 'Register Success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: '',
                },
            });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    // LOGIN
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username }).populate('followers following', '-password');
            const invalidPassword = await bcrypt.compare(password, user.password);

            if (!user) {
                return res.status(400).json('Wrong username!');
            }

            if (!invalidPassword) {
                return res.status(400).json('Wrong password!');
            }

            if (user && invalidPassword) {
                const access_token = createAccessToken({ id: user._id });
                const refresh_token = createRefreshToken({ id: user._id });

                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    secure: false,
                    path: '/api/v1/auth/refresh_token',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                return res.status(200).json({
                    msg: 'Login Success!',
                    access_token,
                    user: {
                        ...user._doc,
                        password: '',
                    },
                });
            }
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    // LOGOUT
    async logout(req, res) {
        try {
            res.clearCookie('refreshtoken', { path: '/api/v1/auth/refresh_token' });
            res.status(200).json('Logout successfully');
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async generateAccessToken(req, res) {
        try {
            const refresh_token = req.cookies.refreshtoken;

            if (!refresh_token) {
                return res.status(400).json({ msg: 'Please login now 1 .' });
            }

            jwt.verify(refresh_token, process.env.JWT_REFRESH_KEY, async (err, result) => {
                if (err) {
                    return res.status(500).json({ msg: 'Please login now 2.' });
                }

                const user = await User.findById(result.id)
                    .select('-password')
                    .populate('followers following', 'avatar username fullname followers following');

                if (!user) return res.status(400).json({ msg: 'This does not exist.' });

                const access_token = createAccessToken({ id: result.id });

                res.json({
                    access_token,
                    user,
                });
            });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

module.exports = new AuthController();
