const mongoose = require("mongoose");
require("dotenv").config();

async function connectdb(params) {
  try {
    await mongoose.connect("mongodb://localhost:27017/geniai");
    console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectdb;
