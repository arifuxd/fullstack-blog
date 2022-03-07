const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt')

//Update
router.put("/:id", async (req, res) => {

if(req.body.userId === req.params.id){
  
  if(req.body.password){
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }
  try {
   const updatedUser = await User.findByIdAndUpdate(req.params.id,{
     $set : req.body
   })
   res.status(200).json(updatedUser)
  }
  catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
}else{
  res.status(401).json("You can only change your username")
}

});



//Dekete
router.delete("/:id", async (req, res) => {

    try {
     const DeletedUser = await User.findByIdAndDelete(req.params.id)
     res.status(200).json("user Successfully deleted")
    }
    catch (e) {
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


module.exports = router;
