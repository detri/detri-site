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