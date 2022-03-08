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
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.username === post.username) {
      try {
        await post.delete()
        res.status(200).json("Post Successfully Deleted");
      } catch (error) {
        res.status(401).json("something went wrong");
        console.log(error);
      }
    } else {
      res.status(401).json("you can delete only your account");
      console.log("you can delete only your account")
    }
  } catch (error) {
    res.status(404).json("No Post Found");
    console.log(error);
  }
});


//Get single post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json("Post not found");
    console.log(e);
  }
});

//Get All Post
router.get("/", async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let posts;

    if(username){
      posts = await Post.find({username})
    }else if(catName){
      posts = await Post.find({categories : {
        $in : catName
      }})
    }else{
      posts = await Post.find()
    }

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});


module.exports = router;
