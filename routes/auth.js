const router = require("express").Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

module.exports = router;
