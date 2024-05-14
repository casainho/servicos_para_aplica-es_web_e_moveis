var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const database = require('../project_modules/database/database');

router.get('/', function(req, res, next) {
  database.list_users()
    .then((users_json) => {
      if (users_json.length) {
        res.send(users_json);
      } else {
        res.send([].toJson());
      }
    });
});

// // Parse application/x-www-form-urlencoded
// router.use(bodyParser.urlencoded({ extended: false }));

// router.post('/', function(req, res, next) {
//   console.log('req.body:', req.body);
// });

module.exports = router
