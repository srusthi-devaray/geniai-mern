const express = require("express");
const authcontroler = require("../controler/auth.controler");
const authmiddelware = require("../middlewares/auth.middelware");
const authRouter = express.Router();

authRouter.post("/register", authcontroler.registeruser);
authRouter.post("/login", authcontroler.loginuser);
authRouter.get("/logout", authcontroler.logoutuser);

authRouter.get(
  "/get-me",
  authmiddelware.authuser,
  authcontroler.getmecontroler,
);
module.exports = authRouter;
