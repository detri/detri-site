const express = require('express');
const passport = require('passport');

let admin = express.Router();

admin.get('/admin', (request, response) => {
  response.render('admin', {
    request: request
  });
});

admin.post('/admin',
  passport.authenticate('local'),
  (req, res) => {
    res.redirect('/admin');
  });

admin.get('/logout', (request, response) => {
  request.session.destroy();
  response.redirect('/admin');
});

module.exports = admin;
