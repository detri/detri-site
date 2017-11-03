const express = require('express');
const session = require('express-session');
const fs = require('fs');
const parser = require('body-parser');
const router = require('./controllers/router');
const admin = require('./controllers/admin');
const api = require('./controllers/api');
const db = require('./models');

const app = express();
app.set('view engine', 'pug');

// general file serving middleware
app.use('/public', express.static('public'));

// song serving middleware
app.use('/music/:song', (request, response, next) => {
    let path = __dirname + '/songs/' + request.params.song + '.mp3';
    path = unescape(path);
    fs.access(path, (err) => {
        if (err) {
            next();
        }
        response.sendFile(path);
    });
});

// parse the request
app.use(parser.urlencoded({
    extended: false
}));

// initialize the session
app.use(session({
    secret: 'weenie',
    cookie: {},
    resave: false,
    saveUninitialized: true
}));

// routes
app.use('/', api);
app.use('/', admin);
app.use('/', router);

// sync db schema -> make the server listen
db.sequelize.sync().then(() => {
    app.listen(8080);
});