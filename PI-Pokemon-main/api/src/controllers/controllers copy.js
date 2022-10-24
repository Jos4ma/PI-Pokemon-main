const axios = require('axios')
//Función para normalizar la respuesta que llega de la api
const {habilityDataApi} = require("./extractors")


const pokemonsApi = async () => {
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
            // const { name, types, urlImg, createInDb } = habilityDataApi(response);
            //console.log(name, types, urlImg, createInDb)
            return { ...habilityDataApi(response) };
            //return { ...(name) };
          })
          .catch((e) => console.log(e));
      });
      const pokemonsApi = await Promise.all(pokemonsDataApiPromises);
      console.log(pokemonsApi)
      return pokemonsApi
}

const allPokemons = async () => {
    return perro = await pokemonsApi()
}
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

// async function getPokemonApiName(query) {
//   var arrayPokemonsApi = getPokemonAPI()
//   console.log(arrayPokemonsApi)
//     //console.log(pInfo(infoForName))
//     const filteredRecipeApi = await arrayPokemonsApi.filter((pokemon) =>
//     pokemon.name === query
//   );
//   return pInfo(filteredRecipeApi)
// }

// version internet
// async function getPokemonApiName(query) {
//   var arrayPokemonsApi = getPokemonAPI()
//   console.log(arrayPokemonsApi)
//     //console.log(pInfo(infoForName))
//     const filteredRecipeApi = await arrayPokemonsApi.filter((pokemon) =>
//     pokemon.name === query
//   );
//   return pInfo(filteredRecipeApi)
// }

module.exports = {
    allPokemons
}