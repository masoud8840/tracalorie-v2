const express = require("express");
const router = express.Router();

const { getWorkous, postWorkouts } = require("../controllers/Workout");
router.get("/", getWorkous);
router.post("/", postWorkouts);

module.exports = router;
