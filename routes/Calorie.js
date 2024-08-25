const express = require("express");

const router = express.Router();

const { getCalories, postCalories } = require("../controllers/Calories");

router.get("/", getCalories);
router.post("/", postCalories);

module.exports = router;
