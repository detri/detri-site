const express = require('express');
const db = require('./models');
const path = require('path');
const api = require('./routes/api');

const app = express();

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, '/views'));

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/api', api);

app.get('/', (req, res) => {
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
      response.message += 'Unspecified error.';
      break;
  }
  res.status(500).json(response);
});

db.sequelize.sync({force: true}).then(() => {
  app.listen(8080);
});
