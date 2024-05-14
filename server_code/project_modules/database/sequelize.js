const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: './database_file.sqlite'
  }
);

var connection = false;
async function db_connection() {
  try {
    await sequelize.authenticate();
    console.log('\nsequelize.authenticate(): ok\n');
    connection = true;
  } catch (error) {
    console.error('\nsequelize.authenticate() ERROR:', error);
  }
}
db_connection();

module.exports = sequelize;