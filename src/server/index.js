const express = require('express');
const session = require('express-session');
const jsonParser = require('body-parser').json;
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const path = require('path');
const routes = require('./routes');
const api = require('./routes/api');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const JsonStrategy = require('passport-json').Strategy;
const compiler = webpack(webpackConfig);

const app = express();

app.use(jsonParser());

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, '/views'));

// passport

passport.use(new JsonStrategy(
  async (username, password, done) => {
    console.log(password);
    db.User.findOne({
      where: {
        username: {
          [db.Sequelize.Op.iLike]: username
        }
      },
      attributes: {
        include: ['username', 'is_active', 'is_admin']
      }
    })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const validPass = user.validatePassword(password);
        if (!validPass) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }, err => {
        return done(err);
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findOne({
    where: {
      id: id
    }
  })
    .then(user => {
      return done(null, user);
    }, err => {
      return done(err);
    });
});

// initalize hot reloading
app
  .use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }))
  .use(require('webpack-hot-middleware')(compiler))
  .use(session({
    secret: 'dedzoneseekrit',
    saveUninitialized: false,
    store: new SequelizeStore({
      db: db.sequelize,
      disableTouch: true
    }),
    resave: false,
  }))
  .use(passport.initialize())
  .use(passport.session());

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', routes);

app.use('/api', api);

app.get('*', (req, res) => {
  res.render('layout');
});

app.use((err, req, res, next) => {
  console.log(err);
  const response = {
    ok: false,
    message: ''
  };
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      if (err.fields.username) {
        response.message = 'Username is taken.';
      }
      if (err.fields.email) {
        response.message = 'Email is taken.';
      }
      break;
    default:
      response.message += err.toString();
      break;
  }
  res.status(500).json(response);
});

db.sequelize.sync().then(() => {
  app.listen(8081);
});
