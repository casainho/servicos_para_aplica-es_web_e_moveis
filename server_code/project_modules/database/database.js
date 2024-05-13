const sequelize = require('./sequelize');

// sync with all models with the database
sequelize.sync({alter: true})
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(() => {
    console.error('Error synchronizing database:', err);
  });
