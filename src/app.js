const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { auth } = require("./utils/auth");

const app = express();
/*
const userRouter = require("./routes/user.routes");
const listRouter = require("./routes/list.routes");
const localRouter = require("./routes/local.routes");
const favController = require("./controllers/local.controller");
*/
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/*app.use("/auth", userRouter);
app.use("/api", listRouter);
app.use("/local", localRouter);*/

module.exports = app;
