const express = require("express");
const fs = require("fs");
const db = require("../models");

let api = express.Router();

// user song serving middleware
api.get("/api/music/:username", (req, res, next) => {
  db.User
    .findOne({
      where: {
        username: req.params.username
      },
      include: [{
        model: db.Song,
        as: "songs"
      }],
      order: [
        [{
            model: db.Song,
            as: "songs"
          },
          "release_date",
          "DESC"
        ]
      ]
    })
    .then(user => {
      if (!user || !user.songs) next();
      res.send(JSON.stringify(user.songs));
    }).catch(err => err ? next() : null);
});

module.exports = api;