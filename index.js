const express = require('express');
const session = require('express-session');
const parser = require('body-parser');
const fs = require('fs');
const router = require('./router');
const admin = require('./admin');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static('public'));

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

app.use(session({ secret: 'weenie', cookie: { maxAge: 60000 } }));
app.use(parser.urlencoded({ extended: false }));

app.use('/', admin);
app.use('/', router);

app.listen(8080);