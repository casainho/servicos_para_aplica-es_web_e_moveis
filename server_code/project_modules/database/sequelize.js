const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: './project_modules/database/sqlite_database_file.sqlite'
  }
);

module.exports = sequelize;