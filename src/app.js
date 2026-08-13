const express = require("express");
require("dotenv").config();
const connectdb = require("./db/db");
const app = express();
const authRouter = require("./routes/auth.route");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());
app.use("/api/auth", authRouter);

connectdb();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
