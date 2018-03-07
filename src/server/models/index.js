// this is code from sequelize-cli, but it has been modified

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config.json'))[env].database;
const db = {};

let sequelize;
if (config.dialect === 'postgres') {
  sequelize = new Sequelize(`postgresql://${config.user}:${config.pass}@${config.host}:${config.port}/${config.db}`);
} else {
  sequelize = new Sequelize(
    config.db,
    config.user,
    config.pass,
    config
  );
}

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

// model relationships
db.User.hasMany(db.Song);
db.Song.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
