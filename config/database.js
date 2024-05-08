const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://firozkamdar1:MP11NC4201@cluster1.s5t0hag.mongodb.net/?retryWrites=true&w=majority");
    } catch (error) {
        throw {error}
    }
}

module.exports = connect;