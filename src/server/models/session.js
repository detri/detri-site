module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Session', {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      userId: DataTypes.STRING,
      expires: DataTypes.DATE,
      data: DataTypes.STRING(255)
    }, {
      underscored: true,
      timestamps: false
    }
  );
};
