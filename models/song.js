"use strict";
module.exports = function (sequelize, DataTypes) {
  let Song = sequelize.define(
    "Song", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      song_name: DataTypes.STRING,
      filename: DataTypes.STRING,
      play_count: DataTypes.BIGINT,
      release_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      author: DataTypes.STRING
    }, {
      underscored: true
    }
  );
  return Song;
};