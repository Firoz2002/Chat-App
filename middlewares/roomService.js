const Room = require('../models/room');

require('dotenv').config();
const jwt = require('jsonwebtoken');

class RoomService {
    async createRoom (data) {

        const {roomname} = data;
        const payload = jwt.verify(req.cookies.jwt, process.env.SECRET);
        const user = payload.username;
        try {
            await Room.create({
                roomname,
                admin: user,
            }).then(data => res.status(200).json({
                message: "Succesfully created room",
                data
                })
            )
        } catch (err) {
            res.status(401).json({
                message: "Some error occured",
                error: err,
            })
        }
    }

    async joinRoom (data) {
        
        if(roomExist(!data)) {
            return res.status(402).json({
                message: "Room does not exist"
            })
        }

        try {
            const response = await Room.findOne({data});
            
        } catch (error) {
            throw {error}
        }
    }

    async roomExist (data) {
        try {
            const response = await Room.findOne({ data });
    
            if(response.data = null) return false;

            else return true;

        } catch (error) {
            throw {error}
        }
    }
}
module.exports = {
    createRoom,
    
}
