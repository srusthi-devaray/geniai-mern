const express = require("express");
require("dotenv").config();
const connectdb = require("./db/db");
const app = express();
const authRouter = require("./routes/auth.route");
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);

connectdb();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
