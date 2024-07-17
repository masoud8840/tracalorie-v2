const User = require("../models/User");
const Async = require("../composables/Async");
const jwt = require("jsonwebtoken");
const Workout = require("../models/Workout");

module.exports.getWorkous = Async(async (req, res, next) => {
  const recievedToken = req.body.token.split(" ")[1];
  const tokenPayload = verifyToken(recievedToken);

  if (tokenPayload) {
    const userId = tokenPayload.id;
    const foundUser = await User.findOne({ _id: userId });

    const userWorkouts = await Workout.find({ _id: foundUser.workouts });

    return res.json({
      workouts: userWorkouts,
      length: userWorkouts.length,
      status: "ok",
      statusCode: 200,
    });
  }
});

module.exports.postWorkouts = Async(async (req, res, next) => {
  const recievedToken = req.body.token.split(" ")[1];
  const tokenPayload = verifyToken(recievedToken);

  const name = req.body.name || null;
  const calorie = req.body.calorie || null;

  if (tokenPayload && name && calorie) {
    const newWorkout = new Workout({ name, calorie });
    await newWorkout.save();

    const user = await User.findOne({ _id: tokenPayload.id });
    user.workouts.push(newWorkout);
    await user.save();

    return res.json({ workouts: newWorkout, status: "ok", statusCode: 200 });
  }

  const err = new Error("Wrong credentials! Try new credentials.");
  err.status = "failed";
  err.statusCode = 403;
  throw err;
});

function verifyToken(token) {
  const tokenPayload = jwt.verify(token, process.env.jwt_hash);
  return tokenPayload;
}
