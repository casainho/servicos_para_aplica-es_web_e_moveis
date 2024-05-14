const Sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');

const users = Sequelize.define('users', {
  date_created: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_last_change: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_password: {
    type: DataTypes.TEXT,
    allowNull : false
  },
  user_full_name: {
    type: DataTypes.TEXT,
    allowNull : false
  },
},
{
  timestamps: false // Disable automatic timestamp management
});

module.exports = users;