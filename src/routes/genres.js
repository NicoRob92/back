require('dotenv').config();
const axios = require('axios');
const { Router } = require('express')
const { API_KEY } = process.env
const { Genre , Videogame , Platforms} = require('../db.js');
const router = Router();


router.get('/', async (req,res)=>{  


    const generoDb = await Genre.findAll()
    
   try{
       if(generoDb.length === 0){
       const generoApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) // Traigo los datos de la api
       generoApi.data.results.forEach(e => {
           Genre.findOrCreate({ // busco y si no encuentro creo
               where:{
                   name:e.name // donde el name de la entidad en la base de datos concuerde con el name de la entidad en la api
               }
           })
       })
       generoDb = await Genre.findAll()
    }
    
       res.json(generoDb)
    }
    catch{
       res.sendStatus(404)
   }
   
})

module.exports = router;