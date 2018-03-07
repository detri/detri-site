const user = require('express').Router();
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const promisify = require('util').promisify;
const db = require('../../models');
const parseRequest = require('body-parser').json();

const randomBytes = promisify(crypto.randomBytes);
const pbkdf2 = promisify(crypto.pbkdf2);

user.get('/:id', asyncHandler(async (req, res) => {
  const user = await db.User.findOne({
    where: {
      id: req.params.id
    },
    exclude: ['pass_hash', 'pass_salt', 'email']
  });
  res.status(200).json({
    ok: true,
    data: user
  });
}));

user.get('/', asyncHandler(async (req, res) => {
  const users = await db.User.findAll({
    exclude: ['pass_hash', 'pass_salt', 'email'],
    include: [db.Song]
  });
  res.status(200).json({
    ok: true,
    data: users
  });
}));

user.post('/',
  parseRequest,
  asyncHandler(async (req, res) => {
    const salt = await randomBytes(64);
    const hash = await pbkdf2(req.body.password, salt, 250000, 64, 'sha512');
    const user = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      pass_hash: hash,
      pass_salt: salt
    });
    res.status(200).json({
      ok: true,
      data: user
    });
  }));

module.exports = user;
