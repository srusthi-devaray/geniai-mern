const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already taken"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Account already existed with this email"],
  },
  password: {
    type: String,
    required: true,
  },
});

const usermodel = mongoose.model("user", userSchema);

module.exports = usermodel;
