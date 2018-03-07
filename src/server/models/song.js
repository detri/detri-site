module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Song', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID4,
        primaryKey: true
      },
      number: {
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      play_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      length: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      underscored: true
    }
  );
};
