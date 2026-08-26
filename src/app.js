const express = require("express");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const connectdb = require("./db/db");
const app = express();

const authRouter = require("./routes/auth.route");
const interiviewrouter = require("./routes/interview.routes");

const cookieparser = require("cookie-parser");
const cors = require("cors");
const invokegeminai = require("./services/ai.services");
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/interview", interiviewrouter);
// const { resume, selfdescription, jobdescription } = require("./services/temp");
// const generateinterviewreport = require("./services/ai.services");

connectdb();
// generateinterviewreport({ resume, selfdescription, jobdescription });

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
