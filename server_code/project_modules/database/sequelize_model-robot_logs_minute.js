const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');

let robot_logs_minute_model = sequelize.define('robot_logs_minute', {
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  energy_wh: {
    type: DataTypes.REAL,
    allowNull: false
  },
  distance_meters: {
    type: DataTypes.REAL,
    allowNull : false
  }
});

module.exports = robot_logs_minute_model;