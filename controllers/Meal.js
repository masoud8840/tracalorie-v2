const User = require("../models/User");
const Async = require("../composables/Async");
const verifyToken = require("../composables/verifyToken");
const Meal = require("../models/Meal");

module.exports.getMeals = Async(async (req, res, next) => {
  const recievedToken = req.body.token.split(" ")[1];
  const tokenPayload = verifyToken(recievedToken);

  if (tokenPayload) {
    const userId = tokenPayload.id;
    const foundUser = await User.findOne({ _id: userId });

    const userMeals = await Meal.find({ _id: foundUser.meals });

    return res.json({
      meals: userMeals,
      length: userMeals.length,
      status: "ok",
      statusCode: 200,
    });
  }
});

module.exports.postMeals = Async(async (req, res, next) => {
  const recievedToken = req.body.token.split(" ")[1];
  const tokenPayload = verifyToken(recievedToken);

  const name = req.body.name || null;
  const calorie = req.body.calorie || null;

  if (tokenPayload && name && calorie) {
    const newMeal = new Meal({ name, calorie });
    await newMeal.save();

    const user = await User.findOne({ _id: tokenPayload.id });
    user.meals.push(newMeal);
    await user.save();

    return res.json({ meals: newMeal, status: "ok", statusCode: 200 });
  }

  const err = new Error("Wrong credentials! Try new credentials.");
  err.status = "failed";
  err.statusCode = 403;
  throw err;
});
