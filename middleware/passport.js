const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//Models
const { User } = require("../db/models");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } });
    let passwordsMatch;

    passwordsMatch = user //check user
      ? await bcrypt.compare(password, user.password) // first password from req.body, second password is from the database
      : (passwordsMatch = false);

    passwordsMatch
      ? done(null, user) //null: no error, user: save user in request
      : done(null, false);
  } catch (error) {
    done(error);
  }
});
