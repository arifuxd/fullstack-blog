const express = require("express");
const router = express.Router()
const Category = require('../models/Category')


router.post('/', async(req, res)=> {
    const newCat = new Category(req.body)
    try{
      const savedCat =   await newCat.save()

        res.status(200).json(savedCat)
    }
    catch (e) {
        res.status(500).json('Something went Wrong')
        console.log(e)
    }
})


router.get('/', async (req, res)=>{
    
    try{    
        const categories = await Category.find()
        res.status(200).json(categories)
    }catch{
        res.status(500).json('Something went Wrong')
    }
})

module.exports = router