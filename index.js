const express = require('express');
const session = require('express-session');
const parser = require('body-parser');
const fs = require('fs');
const router = require('./controllers/router');
const admin = require('./controllers/admin');
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

// initialize the session
app.use(session({ secret: 'weenie',
                  cookie: { maxAge: 60000 },
                  resave: false,
                  saveUninitialized: true }));
// parse the request
app.use(parser.urlencoded({ extended: false }));

// routes
app.use('/', admin);
app.use('/', router);

// sync db schema -> make the server listen
db.sequelize.sync().then(() => {
    app.listen(8080);
});