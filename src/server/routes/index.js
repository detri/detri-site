const routes = require('express').Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport');

routes.get('/authcheck',
  asyncHandler(async (req, res, next) => {
    if (req.isAuthenticated()) {
      req.user.pass_hash = undefined;
      return res.status(200).json({
        ok: true,
        user: req.user
      });
    }
    return res.status(400).json({
      ok: false
    });
  }));

routes.post('/login',
  asyncHandler(async (req, res, next) => {
    passport.authenticate('json', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).json({
          ok: false,
          error: info.message
        });
      }
      user.pass_hash = undefined;
      req.logIn(user, err => {
        if (err) return next(err);
        return res.status(200).json({
          ok: true,
          user
        });
      });
    })(req, res, next);
  }));

module.exports = routes;