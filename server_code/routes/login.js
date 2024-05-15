var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/login/success',
    failureRedirect: '/login/failure',
    failureFlash: true
  });
  res.send('???');
});

router.get('/success', (req, res) => {
  res.send('Login successful');
});

router.get('/failure', (req, res) => {
  res.send('Login failed');
});

module.exports = router
