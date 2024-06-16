const mongoose = require('mongoose');

require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        throw {error}
    }
}

module.exports = connect;