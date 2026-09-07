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

interiviewrouter.get(
  "/report/:interviewid",
  authmiddleware.authuser,
  interviewcontroller.getinterviewreportbyidcontroller,
);

interiviewrouter.get(
  "/report",
  authmiddleware.authuser,
  interviewcontroller.getallinterviewreportcontroller,
);

module.exports = interiviewrouter;
