require('dotenv').config();
const axios = require('axios');
const { Router } = require('express')
const { API_KEY } = process.env
const { Genre , Videogame, Platforms } = require('../db.js');
const router = Router();

router.post('/', async(req,res) =>{

    try{    
    const {name,
         description,
         released,
         rating,
         platforms,
         genres,
         } = req.body

       

        const game = await Videogame.create({
                    
             name:name,
             description:description,
             released:released,
             rating:rating,
             background_image:"https://th.bing.com/th/id/R.2759aec8140a34b8bda8b89458ac73e7?rik=EguoRhg7o7GSOw&pid=ImgRaw&r=0"}) 

     
        await game.addPlatforms(platforms)
               
        await game.addGenres(genres)
        res.status(201).json({msg:"Creado con esssssito"})
    }catch(err){
        res.status(404).send(err)
    }

})

module.exports = router;