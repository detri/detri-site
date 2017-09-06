const express = require('express');
const multer = require('multer');

let admin = express.Router();
let users = {
    detri: {
        username: 'detri',
        password: 'monkaS'
    },
    roar: {
        username: 'roar',
        password: 'PogChamp'
    }
}

const upload = multer({
    dest: './songs',
    limits: {
        fieldSize: 20
    },
    fileFilter: (req, file, cb) => {
        (file.mimetype == 'audio/mp3') ? cb(null, true) : cb(null, false);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './songs')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
});

function matchUser(un, pw) {
    let matched = false;
    return matched;
}

admin.get('/admin', (request, response) => {
    if (request.session.loggedIn == undefined) {
        request.session.loggedIn = false;
    }
    response.render('admin', { loggedIn: request.session.loggedIn });
});

admin.post('/admin', (request, response) => {
    Object.getOwnPropertyNames(users).map((v) => {
        if (!request.session.loggedIn) {
            (request.body.username == users[v].username && request.body.password == users[v].password)
            ? request.session.loggedIn = true : request.session.loggedIn = false;
        }
    });
    response.redirect('/admin');
});

admin.post('/upload',  upload.single('song'), (request, response) => {
    console.log(request.file);
    response.send('Upload of ' + request.file.originalname + ' success !!');
});

admin.get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/admin');
});

module.exports = admin;