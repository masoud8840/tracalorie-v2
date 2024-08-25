require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

dotenv.config();
// uses dotenv variable
require("./composables/ConnectToDatabase");

const app = express();
app.use(express.json());
app.use(cors());

const useAuthentication = require("./routes/Authentication");
app.use(`${process.env.base_URL}/auth`, useAuthentication);

const useWorkouts = require("./routes/Workout");
app.use(`${process.env.base_URL}/users/workouts`, useWorkouts);

const useMeals = require("./routes/Meal");
app.use(`${process.env.base_URL}/users/meals`, useMeals);

const useCalories = require("./routes/Calorie");
app.use(`${process.env.base_URL}/users/calories`, useCalories);

app.listen(3000);
