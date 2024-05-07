const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    room: {
        type: String,
        require: true
    }
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;