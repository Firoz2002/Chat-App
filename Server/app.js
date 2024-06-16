const path = require('path');
const cors = require('cors');
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const connect = require('./config/database');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Client/views'));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../Client/public')));

app.use(require("./route/route"));

app.get('/', (req, res) => { res.render('home') })
app.get('/login', (req, res) => { res.render('login') })
app.get('/signup', (req, res) => { res.render('register') })
app.get('/index', (req, res) => { res.render('index') })
app.get('/room', (req, res)=>{ res.render('room') })

const server = app.listen(port, async () => {
    try {
        console.log(`Server Running on PORT: ${port}`);
        await connect();
        console.log('Mongodb connected');
    } catch (error) {
        throw {error}
    }
})

const io = socket(server);
require('./utils/socket')(io); 