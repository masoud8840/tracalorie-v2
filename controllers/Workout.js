const User = require("../models/User");
const Async = require("../composables/Async");
const jwt = require("jsonwebtoken");

module.exports.getWorkous = Async(async (req, res, next) => {
  const recievedToken = req.body.token.split(" ")[1];
  const tokenPayload = jwt.verify(recievedToken, process.env.jwt_hash);
  if (tokenPayload) {
    const userId = tokenPayload.id;
    const foundUser = await User.findOne({ _id: userId });
    console.log(foundUser);
  }
});
