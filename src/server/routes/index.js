const routes = require('express').Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport');

routes.post('/login',
  passport.authenticate('json'),
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        ok: false
      });
    }
    user.pass_hash = undefined;
    return res.status(200).json({
      ok: true,
      user
    });
  }));

module.exports = routes;