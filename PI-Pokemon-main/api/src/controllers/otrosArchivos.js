const allPokemons = async () => {
    const dataApi = await Promise.all([
        axios.get("https://pokeapi.co/api/v2/pokemon"),
        axios.get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"),
      ]);
      // console.log(datApi) ---> [{ data: {results:[] } }, { data:{results:[] } }]
      dataArr1 = dataApi[0].data.results;
      dataArr2 = dataApi[1].data.results;
  
      const pokemonsDataApi = dataArr1.concat(dataArr2); //[{name, url}, {name2, url2}, ...]
      const pokemonsDataApiPromises = pokemonsDataApi?.map((pokemon) => {
        return axios 
          .get (pokemon.url)
          .then((response) => {
            return {
                name:
                  response.data.name.charAt(0).toUpperCase() +
                  response.data.name.slice(1),
                types: response.data.types?.map((elem) => {
                  return elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1);
                }),
                urlImg: response.data.sprites.other["official-artwork"].front_default,
                id: response.data.id,
                height: response.data.height,
                weight: response.data.weight,
                ...response.data.stats.reduce(
                  //El metodo reduce me retorna un objeto: {hp: , speed: , attack:  , defense: }
                  (prevValue, actualValue) => ({
                    ...prevValue,
                    [actualValue.stat.name]: actualValue.base_stat,
                  }),
                  {}
                ),
                createInDb: false,
               }
          })
          .catch((e) => console.log(e));
      });
      const pokemonsApi = await Promise.all(pokemonsDataApiPromises);
    //   console.log(pokemonsApi)
      return pokemonsApi
}

// const getPokemonByName = async(q) => {
//   //  const { Recipe, Diet } = require("../db"); 
//   console.log(q)
//   const query = q.toLowerCase();
//   try {
//     const dataApi = await Promise.all([
//       axios.get("https://pokeapi.co/api/v2/pokemon"),
//       axios.get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"),
//     ]);
//     // console.log(datApi) ---> [{ data: {results:[] } }, { data:{results:[] } }]
//     dataArr1 = dataApi[0].data.results;
//     dataArr2 = dataApi[1].data.results;

//     //const pokemonsDataApi = dataArr1.concat(dataArr2); //[{name, url}, {name2, url2}, ...]
//     const pokemonsDataApiPromises = dataArr1?.map( (pokemon) => {
//       return{ 
//           var result = await axios.get(pokemon.url)
        
//           return {
//               name:
//               result.data.name.charAt(0).toUpperCase() +
//                 response.data.name.slice(1),
//               types: response.data.types?.map((elem) => {
//                 return elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1);
//               }),
//               urlImg: response.data.sprites.other["official-artwork"].front_default,
//               id: response.data.id,
//               height: response.data.height,
//               weight: response.data.weight,
//               ...response.data.stats.reduce(
//                 //El metodo reduce me retorna un objeto: {hp: , speed: , attack:  , defense: }
//                 (prevValue, actualValue) => ({
//                   ...prevValue,
//                   [actualValue.stat.name]: actualValue.base_stat,
//                 }),
//                 {}
//               ),
//               createInDb: false,
//              }
             
//             }
//         })
  
//       });
//       const pokemonsDataApiPromises = await dataArr1.data.map((el) => {
//         return {
//           id: `${el.id}`,
//           title: el.title,
//           dishTypes: el.dishTypes,
//           diets: el.diets,
//           healthScore: el.healthScore,
//           image: el.image,
//         };
//       });
//     console.log(pokemonsDataApiPromises)
//     const filteredRecipeApi = await pokemonsDataApiPromises.filter((pokemon) =>
//       pokemon.name.toLowerCase().includes(query)
//     );
// //     const recipeDB = await Recipe.findAll({
// //       where: {
// //         title: {
// // //            [Sequelize.Op.iLike]: `%${query}%`,
// //           [Op.iLike]: `%${query}%`,
// //           },
// //       },
// //       include: {
// //         model: Diet,
// //         attributes: ["name"],
// //         through: {
// //           attributes: [],
// //         },
// //       },
// //     });
//     return filteredRecipeApi
//   } catch (err) {
//     console.log(err);
//   }
//   }

// const allPokemons = async () => {
//     return perro = await pokemonsApi()
// }
// const allPokemons = async () => {
//     var reciboApi = "https://pokeapi.co/api/v2/pokemon"
//     console.log(reciboApi)
//     var datos = []
//     //el for
//     //for (var i=0; i<3; i++) {
//         //console.log(i)
//         //traer la pagina nueva
//         const getPokemones = await axios.get(reciboApi)
//         // hacer el map
//         // getPokemones.data.results.map((e)=>{
//         //     datos.push({
//         //         name: e.name,
//         //     })
//         // })
//         var datito = getPokemones.data.results[1].name
//         console.log(datito)
//         //la direccion del next
//         reciboApi = getPokemones.data.next
// //        }
//         return datito
// }

const getApiInfoAll = async()=>{
  let gamesData = [];

  //for (let i = 1; i < 6; i++) {
      gamesData.push(await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${1}`));
  //}
  console.log(gamesData)
  var perro = Promise.all(gamesData)
      .then((response) => {

          let pages = [];
          let resultado = [];
          for (let i = 0; i < 2; i++) {
          //for (let i = 0; i < response.length; i++) {
              pages = [...pages, response[i].data.results];
          }

          pages.map(p => {
              p.forEach(v => {
                  resultado.push({
                      id: v.id,
                      name: v.name,
                      image: v.background_image,
                      rating: v.rating.toFixed(2),
                      genres: v.genres.map(g => g.name).join(', ').trim()
                  })
              })
          })
          //console.log(resultado)
          return resultado;
      })
      console.log(perro)
      return perro
}
