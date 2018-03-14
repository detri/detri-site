const song = require('./song');
const user = require('./user');

const api = require('express').Router();

api.use('/song', song);
api.use('/user', user);

module.exports = api;
