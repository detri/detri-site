const express = require('express');
const session = require('express-session');
const fs = require('fs');
const parser = require('body-parser');
const songs = require('./controllers/api/songs');
const users = require('./controllers/api/users');
const router = require('./controllers/new-router');
const db = require('./models');
const passHelper = require('./helpers/passGen');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// configure passport
passport.use(new LocalStrategy(
    (username, password, done) => {
      db.User
            .findOne({
              where: {
                username: username
              }
            })
            .then(user => {
              if (!user) {
                return done(null, false, {
                  message: 'Please enter a valid username.'
                });
              }
              passHelper.verifyPass(password, user.password)
                    .then(verified => {
                      if (!verified) {
                        return done(null, false, {
                          message: 'You have entered an incorrect password.'
                        });
                      }
                      return done(null, user);
                    })
                    .catch(err => {
                      return done(err);
                    });
            })
            .catch(err => {
              return done(err);
            });
    }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((sesh, done) => {
  db.User
        .findOne({
          where: {
            id: sesh.id
          }
        })
        .then(user => {
          done(null, user);
        });
});

// init and configure app
const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// general file serving middleware
app.use('/public', express.static(__dirname + '/public'));

// song serving middleware
app.use('/music/:song', (request, response, next) => {
  let path = __dirname + '/songs/' + request.params.song;
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
app.use(parser.json());

// initialize the session
app.use(session({
  secret: 'weenie',
  cookie: {},
  resave: false,
  saveUninitialized: true
}));

// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// CRUD controllers (I just really wanted to type that tbh)
app.use('/api/songs', songs);
app.use('/api/users', users);

// routes
app.use('/', router);

// sync db schema -> make the server listen
db.sequelize.sync().then(() => {
  app.listen(8080);
});
