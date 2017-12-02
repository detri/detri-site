const db = require('./models');
const passHelper = require('./helpers/passGen');

db.sequelize.sync().then(() => {
  db.User
        .findAll()
        .then(users => {
          let passPromises = [];
          for (let user of users) {
            const promise = passHelper.generatePassword(user.password).then(password => {
              user.password = password;
              user.save();
              return user;
            });
            passPromises.push(promise);
          }
          Promise.all(passPromises).then(() => {
            console.log('Sh*ite is updated !!');
          });
        });
});
