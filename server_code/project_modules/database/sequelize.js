const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: './database_file.sqlite',
    logging: false // Disable logging
  }
);

var connection = false;
async function db_connection() {
  try {
    await sequelize.authenticate();
    console.log('\nsequelize.authenticate(): ok');
    connection = true;
  } catch (error) {
    console.error('\nsequelize.authenticate() ERROR:', error);
  }
}
db_connection();

module.exports = sequelize;