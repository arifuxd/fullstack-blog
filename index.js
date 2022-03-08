const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require('multer')


const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const CatRoute = require('./routes/categories')
const bodyParser = require("body-parser");

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, "images")
  }, filename : (req, file, cb) =>{
    cb(null, req.body.name)
  }
})

const upload = multer({storage : storage})

app.post('/api/upload', upload.single('file'), (req, res)=>{
  res.status(200).json('File has been successfully uploaded')
})
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", CatRoute);

app.listen("3000", () => {
  console.log("Backend Server Running");
});
