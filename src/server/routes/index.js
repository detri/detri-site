const routes = require('express').Router();
const jsonParser = require('body-parser').json;
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;

const readdir = promisify(fs.readdir);

routes.use(jsonParser());

routes.get('/resume', asyncHandler(async (req, res, next) => {
  const rootPath = path.join(__dirname, '..', 'public');
  const fileList = await readdir(rootPath);
  const fileName = fileList.find(v => /^Aaron Resume/g.test(v));
  if (!fileName) {
    res.status(404).send('Resume not found!');
  } else {
    res.status(200).download(path.join(rootPath, fileName), 'resume.docx');
  }
}));

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