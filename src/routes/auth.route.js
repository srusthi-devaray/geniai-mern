const express = require("express");
const authcontroler = require("../controler/auth.controler");

const authRouter = express.Router();

authRouter.post("/register", authcontroler.registeruser);
authRouter.post("/login", authcontroler.loginuser);
authRouter.get("/logout", authcontroler.logoutuser);
module.exports = authRouter;
