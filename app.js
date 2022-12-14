const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const onHeaders = require('on-headers');
const helmet = require('helmet');

const models = require('./models');

const userRoutes = require('./routes/user');
const shortcutRoutes = require('./routes/shortcut');

require('dotenv').config();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
    // res.setDateHeader("Expires", 0); // Proxies.
    // Pass to next layer of middleware
    next();
});


app.use(helmet()); //for saving the server from known security issues

app.options("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //other headers here
    res.status(200).end();
});

// app.use(express.bodyParser({defer:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user',userRoutes); //for user methods
app.use('/shortcut',shortcutRoutes);  //for shortcut methods

//handle 404 not found error
app.use(function(req,res,next) {
    res.status(404).send('Incorrect or unauthorized path');
    next();
});

module.exports = app;
