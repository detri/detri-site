const express = require("express");
const fs = require("fs");
const path = require("path");
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

songs.get("/:type?", (req, res) => {
    if (req.params.type === "latest") {
        db.Song
            .findOne({
                order: [
                    ["release_date", "DESC"]
                ]
            })
            .then(song => {
                res.json({
                    status: "success",
                    body: song
                })
            });
    } else {
        db.Song
            .findAll()
            .then(songList => {
                res.json({
                    status: "success",
                    body: songList
                });
            });
    }
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
                res.json({
                    status: "success",
                    body: song
                });
            });
    }
);

songs.post("/",
    isLoggedIn,
    upload.single("file"),
    (req, res) => {
        console.log("Attempting upload");
        const releaseDate = req.body.releaseDate || Date.now();
        console.log(req.file);
        db.Song
            .create({
                id: uuidv4(),
                song_name: req.body["song-title"],
                filename: req.file.originalname,
                play_count: 0,
                release_date: releaseDate,
                user_id: req.session.userId,
                author: req.session.username
            })
            .then(song => {
                res.json({
                    status: "success",
                    message: song.song_name + " was uploaded successfully!",
                    body: song
                });
            });
    }
);

songs.put("/:id",
    isLoggedIn,
    upload.single("file"),
    (req, res) => {
        const songToPut = {
            id: uuidv4(),
            song_name: req.body["song-title"],
            filename: req.file.originalname,
            release_date: req.body.releaseDate,
            user_id: req.session.userId,
            author: req.session.username
        };
        db.Song
            .upsert(songToPut)
            .then(created => {
                if (created) {
                    res.json({
                        status: "success",
                        message: songToPut.song_name + " was created!",
                        body: songToPut
                    });
                } else if (!created) {
                    res.json({
                        status: "success",
                        message: song.song_name + " was updated!",
                        body: songToPut
                    });
                } else {
                    res.json({
                        status: "error",
                        message: "Query error."
                    });
                }
            });
    }
);

songs.delete("/:id",
    //isLoggedIn,
    (req, res) => {
        const songToDel = {
            id: req.params.id
        }
        db.Song
            .findOne({
                where: {
                    id: songToDel
                }
            })
            .then(song => {
                return song.destroy();
            })
            .then(song => {
                fs
                    .unlink("./songs/" + song.filename, (err) => {
                        try {
                            if (err) {
                                throw new Error(err);
                            } else {
                                res.json({
                                    status: "success",
                                    message: song.song_name + " has been deleted!",
                                    body: song
                                });
                            }
                        } catch (err) {
                            console.log(err);
                            res.json({
                                status: "error",
                                message: err
                            });
                        }
                    });
            });
    }
);

module.exports = songs;