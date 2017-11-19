const db = require("./models");
const passHelper = require("./helpers/passGen");

db.sequelize.sync().then(() => {
    db.User
        .findAll()
        .then(users => {
            let passPromises = [];
            for (let user of users) {
                passPromises.push(passHelper.generatePassword(user.password));
            }
            Promise
                .all(passPromises)
                .then(values => {
                    let savePromises = [];
                    for (let i in users) {
                        users[i].password = values[i];
                        savePromises.push(users[i].save());
                    }
                    Promise
                        .all(savePromises)
                        .then(values => {
                            console.log(JSON.stringify(values));
                        });
                });
        })
});