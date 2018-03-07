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
    attributes: {
      exclude: ['pass_hash', 'pass_salt', 'email']
    }
  });
  res.status(200).json({
    ok: true,
    data: user
  });
}));

user.get('/', asyncHandler(async (req, res) => {
  const users = await db.User.findAll({
    attributes: {
      exclude: ['pass_hash', 'pass_salt', 'email']
    },
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
    let user = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      pass_hash: hash,
      pass_salt: salt
    });
    user.email = undefined;
    user.pass_hash = undefined;
    user.pass_salt = undefined;
    res.status(200).json({
      ok: true,
      data: user
    });
  }));

// TODO: Update route for changing email and resetting password

user.delete('/:id', asyncHandler(async (req, res) => {
  const rows = await db.User.destroy({
    where: {
      id: req.params.id
    }
  });
  if (rows === 1) {
    res.status(200).json({
      ok: true,
      data: `User of ID ${req.params.id} deleted.`
    });
  } else if (rows > 1) {
    res.status(500).json({
      ok: false,
      data: 'Something went seriously wrong.'
    });
  } else {
    res.status(500).json({
      ok: false,
      data: 'User not found.'
    });
  }
}));

module.exports = user;