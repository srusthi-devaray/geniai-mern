const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenblacklistmodel = require("../models/tokenblacklist");

async function registeruser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "please provide username,email,password",
    });
  }

  const isuseralreadyexist = await usermodel.findOne({
    $or: [{ email }, { password }],
  });

  if (isuseralreadyexist) {
    return res.status(400).json({
      message: "this user exists with this email and username",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await usermodel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "a89109226fbd050fa8f941a56b4ce1861aeba81f8d5d6dea19fbc93584436a15",
  );

  res.cookie("token", token);
  return res.status(201).json({
    message: "user created successfully",
    user: {
      username,
      email,
      id: user._id,
    },
  });
}

async function loginuser(req, res) {
  const { email, password } = req.body;
  const user = await usermodel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      message: "invalid email and password",
    });
  }
  // const ispassword = await bcrypt.compare(password, user.password);
  // if (!ispassword) {
  //   return res.status(400).json({
  //     message: "invalid email and password",
  //   });
  // }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    "a89109226fbd050fa8f941a56b4ce1861aeba81f8d5d6dea19fbc93584436a15",
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "user logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
}

async function logoutuser(req, res) {
  const token = req.cookies.token;
  if (token) {
    await tokenblacklistmodel.create({ token });
  }
  res.clearCookie("token");
  return res.status(200).json({
    message: "user logged out successfully",
  });
}

module.exports = { registeruser, loginuser, logoutuser };
