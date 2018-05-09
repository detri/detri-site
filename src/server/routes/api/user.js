const user = require('express').Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const db = require('../../models');

user.get('/:id', asyncHandler(async (req, res) => {
  const user = await db.User.findOne({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['pass_hash', 'email']
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
      exclude: ['pass_hash', 'email']
    },
    include: [db.Song]
  });
  res.status(200).json({
    ok: true,
    data: users
  });
}));

user.post('/',
  asyncHandler(async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 12);
    let user = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      pass_hash: hash
    });
    user.email = undefined;
    user.pass_hash = undefined;
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
