var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const database = require('../project_modules/database/database');

router.get('/', function(req, res, next) {
  database.list_users()
    .then((users_json) => {
      if (users_json.length) {
        res.status(200).send(users_json);
      } else {
        res.status(200).send([]);
      }
    });
});

router.post('/create', function(req, res, next) {
  
  database.create_user(req.body.user_id, req.body.user_password, req.body.user_full_name)
    .then((return_value) => {
      if (return_value >= 0) {
        console.log('\n/users/add ok');
        res.status(200).send([]);
      } else {
        // 409: conflict
        res.status(409).send([
          {
            "error": "User already exists",
          }
        ]);
      }
    });
});

router.post('/delete', function(req, res, next) {
  
  database.delete_user(req.body.user_id)
    .then((return_value) => {
      if (return_value >= 0) {
        console.log('\n/users/delete ok');
        res.status(200).send([]);
      } else {
        // 404: not found
        res.status(404).send([
          {
            "error": "User not found",
          }
        ]);
      }
    });
});

module.exports = router
