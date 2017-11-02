const express = require("express");
const fs = require("fs");
const multer = require("multer");
const db = require("../models");

let api = express.Router();

const upload = multer({
  dest: "./songs",
  limits: {
    fieldSize: 100, // MB
    fieldNameSize: 1000
  },
  fileFilter: (req, file, cb) => {
    file.mimetype == "audio/mp3" ? cb(null, true) : cb(null, false);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./songs");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

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

api.post("/api/music/upload", upload.single("song"), (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  if (req.session.userId) {
    db.Song
      .create({
        id: uuidv4(),
        song_name: req.body["song-title"],
        filename: req.body.file.name,
        play_count: 0,
        release_date: req.body.releaseDate,
        user_id: req.session.userId,
        author: req.session.username
      })
      .then(song => {
        song.save();
        console.log("Saved song " + song);
        res.send("wow");
      });
  }
});

module.exports = api;