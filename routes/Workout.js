const express = require("express");
const router = express.Router();

const { getWorkous } = require("../controllers/Workout");
router.get("/", getWorkous);

module.exports = router;
