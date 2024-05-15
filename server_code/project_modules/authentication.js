const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let users_list = [];

// Serialize and deserialize user functions
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});
  
passport.deserializeUser((id, done) => {
  users_list = get_users();
  const user = users_list.find(user => user.user_id === id);
  done(null, user);
});

// Local Strategy for username/password authentication
passport.use(new LocalStrategy((user_id, user_password, done) => {
  users_list = get_users();
  const user = users_list.find(user => user.user_id === user_id);
  if (!user) {
    return done(null, false, { message: 'Incorrect user_id' });
  }
  if (user.user_password !== user_password) {
    return done(null, false, { message: 'Incorrect user_password' });
  }
  return done(null, user);
}));

module.exports = passport
