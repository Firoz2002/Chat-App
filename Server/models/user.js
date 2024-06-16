const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        min: 3,
        max: 30,
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;