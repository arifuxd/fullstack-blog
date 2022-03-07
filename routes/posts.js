const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//Create Post
router.post("/", async (req, res) => {
  const newpost = new Post(req.body);
  try {
    const savedPost = await newpost.save();

    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(401).json("you can update only your post");
        console.log(error);
      }
    } else {
    }
  } catch (error) {
    res.status().json("No Post Found");
    console.log(error);
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
    const post = await Post.find();
    res.status(200).json(post);
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
