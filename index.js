const express = require('express');
const router = require('./router');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static('public'));
app.use('/music', express.static('music'));

app.get('/music', router);
app.get('/about', router);
app.get('*', router);

app.listen(8080);