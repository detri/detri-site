module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      number: {
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(24),
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      pass_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      underscored: true
    }
  );
};
