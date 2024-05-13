const sequelize = require('./sequelize');

function users_model() {
  let users = sequelize.define('users', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull : false
    },
    user_full_name: {
      type: DataTypes.STRING,
      allowNull : false
    },
  });

  return users
}

module.exports = users_model;