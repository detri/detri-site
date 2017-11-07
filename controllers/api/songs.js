const express = require("express");
const fs = require("fs");
const multer = require("multer");
const db = require("../../models");
const uuidv4 = require("uuid/v4");
const isLoggedIn = require("../../helpers/authcheck");

const songs = express.Router();

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

songs.post("/",
    isLoggedIn,
    upload.single("file"),
    (req, res) => {
        console.log("Attempting upload");
        const releaseDate = req.body.releaseDate || Date.now();
        db.Song
            .create({
                id: uuidv4(),
                song_name: req.body["song-title"],
                filename: req.file.originalname,
                play_count: 0,
                release_date: releaseDate,
                user_id: req.session.userId,
                author: req.session.username
            }).then(song => {
                song.save().then(() => {
                    res.json({
                        status: "success",
                        message: song.song_name + " was uploaded successfully!"
                    });
                });
            });
    });

songs.get("/", (req, res) => {
    db.Song
        .findAll()
        .then(songList => {
            res.json(songList);
        });
});

songs.get("/:id",
    (req, res) => {
        db.Song
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(song => {
                res.json(song);
            });
    });

module.exports = songs;