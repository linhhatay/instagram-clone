const jwt = require('jsonwebtoken');
const User = require('../models/User');

class MiddlewareController {
    async auth(req, res, next) {
        try {
            const token = req.headers('Authorization');

            if (!token) {
                return res.status(403).json({ msg: 'Invalid Authentication' });
            }
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            if (!decoded) {
                return res.status(403).json({ msg: 'Invalid Authentication' });
            }

            const user = await User.findOne({ _id: decoded.id });
            req.user = user;
            next();
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

module.exports = new MiddlewareController();
