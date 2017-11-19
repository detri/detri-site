const express = require("express");
const multer = require("multer");
const db = require("../models");
const passport = require("passport");

let admin = express.Router();

const upload = multer({
  dest: "./songs",
  limits: {
    fieldSize: 100 // MB
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
  response.render("admin", {
    request: request
  });
});

admin.post("/admin",
  passport.authenticate("local"),
  (req, res) => {
    res.redirect("/admin")
  });

admin.get("/logout", (request, response) => {
  request.session.destroy();
  response.redirect("/admin");
});

module.exports = admin;