const express = require("express");
const authmiddleware = require("../middlewares/auth.middelware");
const interviewcontroller = require("../controler/interiview.controller");
const upload = require("../middlewares/file.middleware");
const interiviewrouter = express.Router();

interiviewrouter.post(
  "/",
  authmiddleware.authuser,
  upload.single("resume"),
  interviewcontroller.generateinterviewreportcontroller,
);

module.exports = interiviewrouter;
