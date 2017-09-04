const express = require('express');
const fs = require('fs');
const router = require('./router');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static('public'));
app.use('/', router);

app.listen(8080);