const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    workouts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Workout",
    },
    meals: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Meal",
    },
    calories: {
      type: {
        "Total Calories": {
          type: Number,
          default: 0,
        },
        "Gain/Loss": {
          type: Number,
          default: 0,
        },
        "Calories Consumed": {
          type: Number,
          default: 0,
        },
        "Calories Burned": {
          type: Number,
          default: 0,
        },
        "Calories Remaining": {
          type: Number,
          default: 0,
        },
      },
      ref: "Calorie",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
