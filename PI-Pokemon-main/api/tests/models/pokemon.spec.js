const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()        //antes
    .catch((err) => {
      console.error('Unable to connect to the database:', err);   //cuando no se conecta a la base datos
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));  
    describe('name', () => {
      it('should throw an error if name is null', (done) => { // esta fijandose si existe la base de datos con tal nombre=?
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
    describe('Score', () => {
      it('should throw an error if spoonacularScore is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid spoonacularScore')))
          .catch(() => done());
      });
      it('should work when spoonacularScore is a number', () => {
        Pokemon.create({ attack: 50 });
      });
    });
  });
});
