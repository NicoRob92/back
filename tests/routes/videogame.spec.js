/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })); 
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
  it('Deberia devolver 19 generos',async()=>{
    let genres = await agent.get('/genres')
    expect(genres.body).length(19)
  });

  it('Deberia devolver 15 juegos',async()=>{
    let data = await agent.get('/videogames?name=gta')
    expect(data.body).length(15)
  });
 
  
  
  


});