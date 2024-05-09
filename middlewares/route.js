const express = require('express');
const {saveMessage, getMessages} = require('./messageService');
const { register, login } = require('./auth');
const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');

router.route('/signup').post(register);
router.route('/login').post(login);

router.route('/room').post((req, res) => {
    roomname = ((req.body.roomname).toLowerCase()).replaceAll(' ','');
    username = jwt.verify(req.cookies.jwt, process.env.SECRET).username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

router.route('/room/:id').post(saveMessage);

router.route('/getMsg').post(getMessages);

module.exports = router;