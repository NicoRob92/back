const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genres = require('./genres.js')
const videogames = require('./videogames.js')
const videogame = require('./videogame.js')
const create = require('./create.js')
const router = Router();
const platforms= require('./plataforms.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/genres', genres)
router.use('/videogames',videogames)
router.use('/videogame',videogame)
router.use('/videogame',create)
router.use('/platforms',platforms)
module.exports = router;
