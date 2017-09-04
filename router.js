const express = require('express');
const fs = require('fs');

let router = express.Router();

router.get('/music', (request, response) => {
    let dir = 'songs/';
    fs.readdir(dir, (err, files) => {
        files = files.map((name) => {
            return {
                name: name,
                lastModified: fs.statSync(dir + name).mtime
            }
        }).sort((a, b) => {
            return b.lastModified - a.lastModified;
        });
        response.render('music', { music: files });
    });
});

router.use('/music', (request, response, next) => {
    let path = __dirname + '/songs' + request.path + '.mp3';
    path = unescape(path);
    fs.access(path, (err) => {
        if (err) {
            console.log(err);
            next();
        }
        response.sendFile(path);
    });
});

router.get('/about', (request, response) => {
    response.render('about');
});

router.get('/', (request, response) => {
    let dir = 'songs/';
    fs.readdir(dir, (err, files) => {
        files = files.map((name) => {
            return {
                name: name,
                lastModified: fs.statSync(dir + name).mtime
            }
        }).sort((a, b) => {
            return b.lastModified - a.lastModified;
        });
        response.render('home', { music: files });
    });
});

router.get('*', (request, response) => {
    response.render('woofy');
});

module.exports = router;