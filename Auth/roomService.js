const Room = require('../models/room');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const createRoom = async (req, res, next) => {
    const {roomname} = req.body;
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

const joinRoom = async (req, res, next) => {

}


module.exports = {
    createRoom,
    
}