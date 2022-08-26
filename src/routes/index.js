const authRouter = require('./auth');
const postRouter = require('./post');
const userRouter = require('./user');
const commentRouter = require('./comment');
const messageRouter = require('./message');

function route(app) {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/post', postRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/comment', commentRouter);
    app.use('/api/v1/message', messageRouter);
}

module.exports = route;
