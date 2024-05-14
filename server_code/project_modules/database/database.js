const Sequelize = require('./sequelize');
const Users = require('./sequelize_model-users');

Sequelize.sync()
  .then(() => {
    console.log('\nDatabase: Sequelize.sync(): ok');
  })
  .catch(error => {
    console.error('\nDatabase: Sequelize.sync() ERROR', error);
  })

async function list_users() {
  try {
    let users = await Users.findAll();
    let users_json = users.map(user => user.toJSON())
    console.log('\nDatabase: list_users() ok');
    return users_json;
  } catch (error) {
    console.error('\nDatabase: list_users() ERROR:', error)
    return null;
  }
}

async function create_user(user_id, user_password, user_full_name) {

  if (user_id == null) {
    // find last user_id
    try {
      const users_list = await Users.findAll();

      if (users_list.length > 0) {
        let last_user = users_list[users_list.length - 1];
        user_id = last_user.user_id + 1;
      }

    } catch (error) {
      console.log('\nDatabase: probably there are no users registered')
      user_id = 0
    }
  } else {
    // check if user already exist
    const users_list = await Users.findAll();

    let user = null;
    user = users_list.find(user => user.user_id === user_id);

    if (user instanceof Users) {
      console.log('\nDatabase: user already exists - ', user_id);
      return -1;
    }
  }

  let new_user = await Users.create(
    {
      'date_created': Date.now(),
      'date_last_change': Date.now(),
      'user_id': user_id,
      'user_password': user_password,
      'user_full_name': user_full_name
    }
  );

  if (new_user) {
    await new_user.save();
    console.log('\nDatabase: new user created - ', user_id);
    return 0;
  } else {
    console.log('\nDatabase: user not created - ', user_id);
    return -2;
  }
}

async function delete_user(user_id) {

  const users_list = await Users.findAll();
  let user = null;
  user = users_list.find(user => user.user_id === user_id);
  if (user instanceof Users) {
    await user.destroy(); // Remove this entry from the database
    console.log('\nDatabase: delete_user() ok - ', user_id);
    return 0;
  } else {
    console.log('\nDatabase: delete_user() NOK user_id not found - ', user_id);
    return -1;
  }
}

module.exports.list_users = list_users;
module.exports.create_user = create_user;
module.exports.delete_user = delete_user;
