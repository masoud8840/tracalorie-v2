const mongoose = require("mongoose");

const CalorieSchema = new mongoose.Schema(
  {
    "Total Calories": {
      type: Number,
      // default: 0,
      required: true,
    },
    "Gain/Loss": {
      type: Number,
      // default: 0,
      required: true,
    },
    "Calories Consumed": {
      type: Number,
      // default: 0,
      required: true,
    },
    "Calories Burned": {
      type: Number,
      // default: 0,
      required: true,
    },
    "Calories Remaining": {
      type: Number,
      // default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Calorie", CalorieSchema);
