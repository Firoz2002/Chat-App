const path = require('path');
const cors = require('cors');
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const connect = require('./config/database');

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

app.get('/', (req, res) => { res.render('home') });

const server = app.listen(port, async () => {
    try {
        console.log(`Server Running on PORT: ${port}`);
        await connect();
        console.log('Mongodb connected');
    } catch (error) {
        console.log(error);
    }
})

const io = socket(server);
require('./utils/socket')(io); 