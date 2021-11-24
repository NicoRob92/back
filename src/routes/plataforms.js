require('dotenv').config();
const axios = require('axios');
const { Router } = require('express')
const { API_KEY } = process.env
const { Genre , Videogame , Platforms} = require('../db.js');
const router = Router();


router.get('/', async (req,res)=>{    
    
   try{
    const platforms = await Platforms.findAll()
      res.json(platforms)
    }
    catch{
       res.sendStatus(404)
   }
   
})

module.exports = router;