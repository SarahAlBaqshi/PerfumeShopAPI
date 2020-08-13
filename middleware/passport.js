const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

//Models
const { User } = require("../db/models");
const { JWT_SECRET } = require("../controllers/config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } });
    let passwordsMatch;

    passwordsMatch = user //check user
      ? await bcrypt.compare(password, user.password) // first password from req.body, second password is from the database
      : (passwordsMatch = false);

    return passwordsMatch ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(), //extraction of token
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    //TODO: check if token is expired
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      return done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
