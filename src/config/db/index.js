const mongoose = require('mongoose');

// 'mongodb://localhost:27017/instagram-api'

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect successfully');
    } catch (error) {
        console.error('Connect failure');
    }
}

module.exports = { connect };
