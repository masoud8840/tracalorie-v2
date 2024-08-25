const Async = require("../composables/Async");
const verifyToken = require("../composables/verifyToken");
const User = require("../models/User");

module.exports.getCalories = Async(async (req, res, next) => {
  const token = req.body.token.split(" ")[1];
  const tokenPayload = verifyToken(token);
  const user = await User.findOne({ _id: tokenPayload.id });

  if (!user) {
    return res.json({
      status: "failed",
      statusCode: 404,
      message: "User not found! Try new credentials.",
    });
  }

  return res.json({
    status: "ok",
    statusCode: 200,
    calories: user.calories,
  });
});

module.exports.postCalories = Async(async (req, res, next) => {
  const token = req.body.token.split(" ")[1];
  const tokenPayload = verifyToken(token);
  const user = await User.findOne({ _id: tokenPayload.id });

  if (!user) {
    return res.json({
      status: "failed",
      statusCode: 404,
      message: "User not found! Try new credentials.",
    });
  }

  const newCalories = req.body.calories;
  user.calories = newCalories;
  await user.save();
  
  return res.json({
    status: "ok",
    statusCode: 200,
    calories: user.calories,
  });
});
