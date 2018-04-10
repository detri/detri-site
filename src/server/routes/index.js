const routes = require('express').Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport');

routes.post('/login',
  passport.authenticate('json'),
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      ok: true
    });
  }));

module.exports = routes;
