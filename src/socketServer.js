let users = [];

const SocketServer = (socket) => {
    socket.on('joinUser', (id) => {
        users.push({ id, socketId: socket.id });
    });

    socket.on('disconnect', () => {
        users = users.filter((user) => user.socketId !== socket.id);
    });

    socket.on('likePost', (newPost) => {
        const ids = [...newPost.author.followers, newPost.author._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost);
            });
        }
    });

    socket.on('unLikePost', (newPost) => {
        const ids = [...newPost.author.followers, newPost.author._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket.to(`${client.socketId}`).emit('unLikeToClient', newPost);
            });
        }
    });

    socket.on('createComment', (newPost) => {
        const ids = [...newPost.author.followers, newPost.author._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost);
            });
        }
    });

    socket.on('deleteComment', (newPost) => {
        const ids = [...newPost.author.followers, newPost.author._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost);
            });
        }
    });

    socket.on('follow', (newUser) => {
        const user = users.find((user) => user.id === newUser._id);
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser);
    });

    socket.on('unFollow', (newUser) => {
        const user = users.find((user) => user.id === newUser._id);
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser);
    });

    socket.on('addMessage', (msg) => {
        const user = users.find((user) => user.id === msg.recipient);
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg);
    });
};

module.exports = SocketServer;
