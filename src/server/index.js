const express = require('express');
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

app.listen(3000);
