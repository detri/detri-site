const express = require('express');
const db = require('./models');
const path = require('path');
const api = require('./routes/api');

const app = express();

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, '/views'));

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/api', api);

app.get('/', (req, res) => {
  res.render('layout');
});

app.use((err, req, res, next) => {
  res.status(500).json({
    ok: false,
    error: err.name
  });
});

db.sequelize.sync({force: true}).then(() => {
  app.listen(8080);
});
