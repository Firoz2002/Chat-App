const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomname: {
        type: String,
        require: true,
        unique: true
    },
    admin: {
        type: String,
        require: true,
    }
}, {timestamps: true});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;