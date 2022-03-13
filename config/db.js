const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const conncetdDB = async () => {
  try {
    await mongoose.connect(db, {});
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = conncetdDB;
