const invite = require('./invite');
const song = require('./song');
const user = require('./user');

const api = require('express').Router();

api.use('/invite', invite);
api.use('/song', song);
api.use('/user', user);

module.exports = api;
