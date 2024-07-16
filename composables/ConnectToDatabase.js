const mongoose = require("mongoose");
const ConnectToDatabase = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.mongoDB_URL);
  } catch (err) {
    throw err;
  }
};

ConnectToDatabase()
  .then((res) => {
    console.log("MongoDB connected".cyan);
  })
  .catch((e) => {
    console.log("MongoDB error: ".red, e);
  });
