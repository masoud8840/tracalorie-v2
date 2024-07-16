const bcrypt = require("bcrypt");
const User = require("../models/User");
const Async = require("../composables/Async");
const jwt = require("jsonwebtoken");

module.exports.postSignup = Async(async (req, res, next) => {
  const username = req.body.username;
  const pw = req.body.password;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const existingUserError = new Error(
      "User already exist! Try new credentials."
    );
    existingUserError.statusCode = 403;
    existingUserError.status = "failed";
    throw existingUserError;
  }

  const password = await bcrypt.hash(pw, 12);
  const newUser = new User({ username, password });
  await newUser.save();

  res.status(200).json({
    message: "User has been created! You can login now.",
    status: "created",
    statusCode: 201,
  });
});

module.exports.postLogin = Async(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const err = new Error("");
  err.status = "failed";
  err.statusCode = 403;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const pwValidity = await bcrypt.compare(password, existingUser.password);
    if (pwValidity) {
      const token = jwt.sign(
        { id: existingUser._id, username: existingUser.username },
        process.env.jwt_hash,
        { expiresIn: "1d" }
      );
      return res.json({
        message: "User verified successfuly! You can use app features",
        status: "ok",
        statusCode: 200,
        token: `Bearer ${token}`,
      });
    }

    err.message = "Wrong credentials! Try new credentials.";
    throw err;
  }

  err.message = "User not found! Try new credentials.";
  throw err;
});
