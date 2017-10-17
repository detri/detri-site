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

// user song serving middleware
app.get("/music/:username", (req, res, next) => {
    db.User
      .findOne({
        where: { username: req.params.username },
        include: [
          {
            model: db.Song,
            as: "songs"
          }
        ],
        order: [
          [
            {
              model: db.Song,
              as: "songs"
            },
            "release_date",
            "DESC"
          ]
        ]
      })
      .then(user => {
        let htmlString = "";
        for (song of user.songs) {
          htmlString += `<div class="button" id="${song.id}" data-url="${"/music/" + song.filename.split('.')[0]}" data-title="${song.song_name}" data-artist-name="${user.username}" data-release-date="${song.release_date.toLocaleDateString()}">
          <i class="material-icons">&#xE038;</i>
          <span class="songtext"> &nbsp; ${song.song_name}</span></div>`
        }
        res.send(htmlString);
      }).catch(err => err ? next() : null);
  });

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