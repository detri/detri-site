const pbkdf2 = require('util').promisify(require('crypto').pbkdf2);
const timingSafeEqual = require('crypto').timingSafeEqual;

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
        type: DataTypes.BLOB,
        allowNull: false
      },
      pass_salt: {
        type: DataTypes.BLOB,
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
      underscored: true,
      getterMethods: {
        async validatePassword (password) {
          const buf = await pbkdf2(String(password), this.pass_salt, 250000, 64, 'sha512');
          return timingSafeEqual(buf, this.pass_hash);
        }
      }
    }
  );
};
