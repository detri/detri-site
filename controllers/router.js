const express = require('express');
const db = require('../models');

let router = express.Router();

router.get('/users/:username', (request, response) => {
  db.User
    .findOne({
      where: {
        username: request.params.username
      },
      include: [{
        model: db.Song,
        as: 'songs'
      }],
      order: [
        [{
          model: db.Song,
          as: 'songs'
        },
          'release_date',
          'DESC'
        ]
      ]
    })
    .then(user => {
      response.render('users', {
        user: user
      });
    });
});

router.get('/users', (request, response) => {
  db.User
    .findAll({
      order: [
        [db.sequelize.fn('upper', db.sequelize.col('username')), 'ASC']
      ]
    })
    .then(users => {
      response.render('users', {
        users: users
      });
    });
});

router.get('/music', (request, response) => {
  db.User
    .findAll({
      include: [{
        model: db.Song,
        as: 'songs'
      }],
      order: [
        [db.sequelize.fn('upper', db.sequelize.col('username'))],
        [{
          model: db.Song,
          as: 'songs'
        },
          'release_date',
          'DESC'
        ]
      ]
    })
    .then(users => {
      response.render('music', {
        users: users
      });
    });
});

router.get('/about', (request, response) => {
  response.render('about');
});

router.get('/', (request, response) => {
  db.Song
    .findOne({
      order: [
        ['release_date', 'DESC']
      ],
      include: [{
        model: db.User,
        as: 'user'
      }]
    })
    .then(song => {
      response.render('home', {
        song: song
      });
    });
});

router.get('*', (request, response) => {
  response.render('woofy');
});

module.exports = router;
