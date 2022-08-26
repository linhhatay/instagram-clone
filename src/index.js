const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;
const SocketServer = require('./socketServer');

const db = require('./config/db');
const route = require('./routes');
const path = require('path');

dotenv.config();
// Connect to DB
db.connect();

app.use(cookieParser());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    SocketServer(socket);
});

// Routes init
route(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}

http.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
