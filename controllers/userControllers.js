const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("./config/keys");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // req.body has the password
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  console.log("exports.signin -> req", req);
  const { user } = req;
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    expires: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
