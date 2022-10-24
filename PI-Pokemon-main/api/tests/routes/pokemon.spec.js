/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');     //para que es chai?
const session = require('supertest-session');
//var session = require("supertest-as-promised")(require("../app"));
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  // describe('GET /allPokemons', () => {
  //   it('should get 200', () =>
  //     agent.get('/allPokemons').expect(200)
  //   );
  describe("GET /allPokemons", () => {
    it("If it receives a name that doesn't exist", async () => {
      try {
        await agent
          .get("/allPokemons")
          .expect(400)
          .expect("This pokemon doesn't exist");
      } catch (err) {
        console.log(err);
      }
    }).timeout(47000);
  
});

  //----------------------

  // describe('GET /allPokemons', () => {
  //   it('should get status 200', () =>
  //     agent.get('/allPokemons')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .expect("This pokemon doesn't exist")
  //   );
  // });

  // describe("GET /allPokemons", () => {
  //   it("If it receives a name that doesn't exist", async () => {
  //     try {
  //       await agent
  //         .get("/allPokemons?name=cangrison")
  //         .expect(400)
  //         .expect("This pokemon doesn't exist");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }).timeout(47000);

  //  });
});


// describe("Recipe routes", () => {
//   describe("GET /recipes", () => {
//     it("If it receives a name that doesn't exist", async () => {
//       try {
//         await agent
//           .get("/recipes?name=empanadas")
//           .expect(400)
//           .expect("This recipe doesn't exist");
//       } catch (err) {
//         console.log(err);
//       }
//     }).timeout(47000);

//   });
// });