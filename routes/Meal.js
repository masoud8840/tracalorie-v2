const { Router } = require("express");
const router = Router();

const { getMeals, postMeals } = require("../controllers/Meal");
router.get("/", getMeals);
router.post("/", postMeals);

module.exports = router;
