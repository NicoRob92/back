require('dotenv').config();
const axios = require('axios');
const { Router } = require('express')
const { API_KEY } = process.env
const { Genre , Videogame ,Platforms} = require('../db.js');
const router = Router();


router.get('/:id', async (req,res)=>{  

    const  id  = req.params.id

    if (id.includes('-')){
        try{
           let gamedb = await Videogame.findByPk(id, {include: [Genre,Platforms]})      
           
           let game = {
            name : gamedb.name,
            background_image: gamedb.background_image || "https://th.bing.com/th/id/R.2759aec8140a34b8bda8b89458ac73e7?rik=EguoRhg7o7GSOw&pid=ImgRaw&r=0",
            genres : gamedb.genres && gamedb.genres.map((p) => p.name),
            description: gamedb.description,
            released: gamedb.released,
            rating:gamedb.rating,
            platforms:gamedb.platforms && gamedb.platforms.map(e => e.name)
            
        }
        console.log(gamedb)
        if(game) return res.json(game);
        }catch(err){
            return res.status(404).json({msg:err + 'database'})
        }
    }
        
    try {
       let gameapi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`) 
      
       if(gameapi.data){
          const game = {
              name : gameapi.data.name,
              background_image: gameapi.data.background_image,
              genres : gameapi.data.genres && gameapi.data.genres.map((p) => p.name).filter(p => p != null),
              description: gameapi.data.description_raw,
              released: gameapi.data.released,
              rating:gameapi.data.rating,
              platforms:gameapi.data.platforms && gameapi.data.platforms.map((p) =>
              p.platform.name).filter(p => p != null)
          }
          res.json(game)
       }

       
  
    }catch{
      return res.status(404).send('No existe el juego')
    }}
    

)
module.exports = router;