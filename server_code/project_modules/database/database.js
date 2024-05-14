const Sequelize = require('./sequelize');
const Users = require('./sequelize_model-users');

Sequelize.sync()
  .then(() => {
    console.log('\nSequelize.sync(): ok\n');
  })
  .catch(error => {
    console.error('\nSequelize.sync() ERROR', error);
  })

async function list_users() {
  try {
    let users_list = await Users.findAll();
    console.log('\nlist_users() ok:', users_list);
  } catch (error) {
    console.log('\nlist_users() ERROR:', error)
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
      console.log('\nProbably, no users exist\n')
      user_id = 0
    }
  } else {
    // check if user already exist
    const users_list = await Users.findAll();

    let user = null;
    user = users_list.find(user => user.user_id === user_id);

    if ((typeof user) == (typeof Users)) {
      console.log('\ncreate_user(): user already exists\n');
      return;
    }
  }

  if (user_id == null) {
    // find last user_id
    try {
      const users_list = await Users.findAll();

      if (users_list.length > 0) {
        let last_user = users_list[users_list.length - 1];
        user_id = last_user.user_id + 1;
      }

    } catch (error) {
      console.log('\nProbably, no users exist\n')
      user_id = 0
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
    console.log('\nNew user created\n');
  } else {
    console.log('\nUser not created\n');
  }
}

async function delete_user(user_id) {

  const users_list = await Users.findAll();
  let user = null;
  user = users_list.find(user => user.user_id === user_id);
  if (user) {
    await user.destroy(); // Remove this entry from the database
    console.log('\ndelete_user() ok');
  } else {
    console.log('\ndelete_user() NOK user_id not found', user_id);
  }
}

module.exports.list_users = list_users;
module.exports.create_user = create_user;
module.exports.delete_user = delete_user;
