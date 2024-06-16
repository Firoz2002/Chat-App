const express = require('express');
const {saveMessage, getMessages} = require('../controllers/message-controller');
const { register, login } = require('../middlewares/auth');
const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');

router.route('/login').get((req, res) => { res.render('login') });
router.route('/login').post(login);

router.route('/register').get((req, res) => { res.render('register') });
router.route('/register').post(register);

router.route('/index').get((req, res) => { res.render('index') });

router.route('/room').post((req, res) => {
    roomname = ((req.body.roomname).toLowerCase()).replaceAll(' ','');
    username = jwt.verify(req.cookies.jwt, process.env.SECRET).username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

router.route('/room').get((req, res) => { res.render('room') });
router.route('/getMsg').post(getMessages);
router.route('/room/:id').post(saveMessage);

module.exports = router;