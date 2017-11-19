const express = require("express");
const db = require("../../models");
const uuidv4 = require("uuid/v4");
const isLoggedIn = require("../../helpers/authcheck");
const passHelper = require("../../helpers/passGen");

const users = express.Router();

users.get("/", (req, res) => {
    db.User
        .findAll({
            attributes: {
                exclude: ["password"]
            }
        })
        .then(userList => {
            res.json({
                status: "success",
                body: userList
            });
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
            res.json({
                status: "success",
                body: user
            });
        });
});

users.post("/",
    isLoggedIn,
    (req, res) => {
        passHelper.generatePassword(req.body.password)
            .then(password => {
                db.User
                    .create({
                        id: uuidv4(),
                        username: req.body.username,
                        password: password
                    })
                    .then(user => {
                        res.json({
                            status: "success",
                            message: user.username + " has been created!",
                            body: user
                        });
                    });
            })
            .catch(err => {
                res.json({
                    status: "error",
                    message: err
                });
            });

    }
);

users.put("/:id",
    isLoggedIn,
    (req, res) => {
        passHelper.generatePassword(req.body.password)
            .then(password => {
                const content = {
                    id: req.params.id,
                    username: req.body.username
                };
                if (password) {
                    content.password = password;
                }
                db.User
                    .upsert(content)
                    .then(created => {
                        if (created) {
                            res.json({
                                status: "success",
                                message: content.username + " has been created!",
                                body: content
                            });
                        } else if (!created) {
                            res.json({
                                status: "success",
                                message: content.username + " has been updated!",
                                body: content
                            });
                        } else {
                            res.json({
                                status: "error",
                                message: "Query error."
                            });
                        }
                    });
            })

    }
);

users.delete("/:id",
    isLoggedIn,
    (req, res) => {
        db.User
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                user.destroy().then(() => {
                    res.json({
                        status: "success",
                        message: user.username + " has been deleted.",
                        body: user
                    });
                });
            })
            .catch(err => {
                res.json({
                    status: "error",
                    message: err
                });
            });
    }
);

module.exports = users;