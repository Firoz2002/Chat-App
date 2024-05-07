const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/chat_app');
}

module.exports = connect;