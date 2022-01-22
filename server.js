const express = require("express");
const mongoose = require("mongoose");
const app = express();
const expressValidator = require("express-validator");
const authRouter = require("./src/routes/auth");
const blogRouter = require("./src/routes/blog");
const likeRouter = require("./src/routes/like");
const morgan = require("morgan");
const router = express.Router();
require("dotenv").config();

app.use(express.json());

app.use(morgan("dev"));
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    autoIndex: true, //this is the code I added that solved it all
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose conected..."));
app.use("/api", authRouter);
app.use("/api", blogRouter);
app.use("/api", likeRouter);

app.listen(process.env.PORT, () =>
  console.log(`YOUR APP STARTED IN ${process.env.PORT} PORT`)
);
