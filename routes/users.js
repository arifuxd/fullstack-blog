const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
      console.log(e);
    }
  } else {
    res.status(401).json("You can only change your account info");
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);

      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted successfully");
      } catch (e) {
        res.status(500).json(e);
        console.log(e);
      }
    } catch (e) {
      res.status(404).json("User Not Found");
    }
  } else {
    res.status(401).json("You can only Delete only your account");
  }
});

//Get All User
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (e) {
    res.status(500).json("User not found");
    console.log(e);
  }
});

module.exports = router;
