// this is code from sequelize-cli, but it has been modified

const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const config = require(path.join(__dirname, '..', 'config.js'))().database;
const db = {};

if (config.dialect === 'sqlite') {
  config.storage = path.join(__dirname, 'testdb.sqlite');
}

let sequelize = new Sequelize(
  config.db,
  config.user,
  config.pass,
  config
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

// instance functions
db.User.prototype.validatePassword = function (password) {
  const hash = this.pass_hash;
  const equals = bcrypt.compareSync(password, hash);
  return equals;
};

// model relationships
db.User.hasMany(db.Song);
db.Song.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
