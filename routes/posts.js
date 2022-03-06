const router = require("express").Router();

const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

module.exports = router;
