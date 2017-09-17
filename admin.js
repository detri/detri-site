const express = require("express");
const multer = require("multer");
const db = require("./models");
const uuidv4 = require("uuid/v4");

let admin = express.Router();

const upload = multer({
  dest: "./songs",
  limits: {
    fieldSize: 20 // MB
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

admin.get("/admin", (request, response) => {
  response.render("admin", { session: request.session });
});

admin.post("/admin", (request, response) => {
  db.sequelize.sync().then(() => {
    db.User
      .findOne({
        where: {
          username: request.body.username,
          password: request.body.password
        }
      })
      .then(user => {
        if (user) {
          request.session.userId = user.id;
          request.session.username = user.username;
          request.session.loggedIn = true;
        }
        response.redirect("/admin");
      });
  });
});

admin.post("/upload", upload.single("song"), (request, response) => {
  db.sequelize.sync().then(() => {
    db.Song
      .create({
        id: uuidv4(),
        song_name: request.body["song-title"],
        filename: request.file.originalname,
        play_count: 0,
        release_date: Date.now(),
        user_id: request.session.userId
      })
      .then(song => {
        song.save().then(() => {
          response.send(
            "Upload of " +
              song.song_name +
              " (" +
              request.file.originalname +
              ") success !!"
          );
        });
      });
  });
});

admin.get("/logout", (request, response) => {
  request.session.destroy();
  response.redirect("/admin");
});

module.exports = admin;
