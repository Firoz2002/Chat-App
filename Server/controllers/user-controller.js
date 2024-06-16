const User = require('../models/user');

class UserService {

    async userExist(data) {
        try {
            const response = await User.findOne(data);

            if(response.data == null) return false
           
            else return true;

        } catch (error) {
            throw {error}
        }
    } 
} 

module.exports = UserService;