const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt')


//Registraion System
router.post("/register", async (req, res) => {


  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username : req.body.username,
      email : req.body.email,
      password : hashedpass
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});

//Login System
router.post('/login', async(req, res)=>{
  try{
    const user = await User.findOne({username : req.body.username})
    !user && res.status(400).json('Wrong Username, Please Check Username')

    const validate = await bcrypt.compare(req.body.password, user.password)

    !validate && res.status(400).json('Wrong Password, Please Check Password')

    const {password, ...others} = user._doc
    res.status(200).json(others)

  }
  catch (e) {
    console.log(e)
  }
})








router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
});


module.exports = router;
