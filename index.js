const express = require('express');
const fs = require('fs');
const router = require('./router');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static('public'));

app.use('/music/:song', (request, response, next) => {
    let path = __dirname + '/songs/' + request.params.song + '.mp3';
    path = unescape(path);
    fs.access(path, (err) => {
        if (err) {
            console.log(err);
            next();
        }
        response.sendFile(path);
    });
});

app.use('/', router);

app.listen(8080);