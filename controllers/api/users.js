const express = require("express");
const fs = require("fs");
const multer = require("multer");
const db = require("../../models");
const uuidv4 = require("uuid/v4");
const isLoggedIn = require("../../helpers/authcheck");

const users = express.Router();

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
            res.json(user);
        });
});

users.post("/",
    isLoggedIn,
    (req, res) => {
        db.User
            .create({
                id: uuidv4(),
                username: req.body.username,
                password: req.body.password
            })
            .then(user => {
                user.save.then(() => {
                    res.json(user);
                });
            });
    });

module.exports = users;