const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/auth");
const userRoute = require('./routes/users')
const postRoute = require("./routes/posts");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen("3000", () => {
  console.log("Backend Server Running");
});

