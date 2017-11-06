const express = require("express");
const fs = require("fs");
const multer = require("multer");
const db = require("../../models");
const uuidv4 = require("uuid/v4");
const isLoggedIn = require("../../helpers/authcheck");

const users = express.Router();

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

users.get("/", (req, res) => {
    db.User
        .findAll({
            attributes: {
                exclude: ["password"]
            }
        })
        .then(userList => {
            res.json(userList);
        });
});

users.get("/:id", (req, res) => {
    db.User
        .findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ["password"]
            }
        })
        .then(user => {
            res.send(user)
        });
});

module.exports = users;