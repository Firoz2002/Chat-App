const Message = require('../models/message');

const saveMessage = async(req, res, next) => {
    const {username, content, room} = req.body;

    try {
        await Message.create({
            
            username, 
            content,
            room,
        }).then(data => res.status(200).json({
            message: "Succesfully saved message",
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

const getMessages = async(req, res, next) => {
    //incomplete
    const roomname = 'Hello';
    var arr = [];
    try {
        var msgs = await Message.find({room: roomname}).sort({$natural: -1}).limit(15);
        msgs.forEach( function(err, index) {
            arr.push({
                username: msgs[index].username,
                message: msgs[index].content});
        })
        arr = arr.reverse();
        res.send(arr);
    } catch (err) {
        
    }
}

module.exports = {
    saveMessage,
    getMessages
}