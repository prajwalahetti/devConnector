const mongoose = require("mongoose");
require('dotenv').config()

const db = process.env.mongoURI;

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
