'use strict';
module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define(
    'User', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      underscored: true
    }
  );
  return User;
};
