const axios = require('axios')
const { Type, Pokemon } = require("../db");
const { Op } = require("sequelize"); 
//Función para normalizar la respuesta que llega de la api


function pInfo(pokemon) {
  return {
      id: pokemon.data.id.toString().trim(),
      name: pokemon.data.name.charAt(0).toUpperCase()+pokemon.data.name.slice(1), 
      health: pokemon.data.stats[0].base_stat,
      attack: pokemon.data.stats[1].base_stat,
      urlImg: pokemon.data.sprites.other["official-artwork"].front_default,
      sprites: pokemon.data.sprites.other.dream_world.front_default,
      type: pokemon.data.types.map((t) => t.type.name)
  }
}

// async function directionPokemon (req) {
//   var name = req.query.name
//   if(name)

// }


//const getPokemonAPI = async(req, res, next) => {
async function getPokemonAPI(req) {
  var name = req.query.name
  if(!name){
  const info = await axios('https://pokeapi.co/api/v2/pokemon?limit=40')
  const infoP = [...info.data.results]
  const infoPF = await Promise.all(
      infoP.map((p) => axios.get(p.url))
  )
  let arrayPokemonsApi = []
  infoPF.forEach((p) => {
      arrayPokemonsApi.push({...pInfo(p)})
  })
  return arrayPokemonsApi
  //res.status(200).send(arrayPokemonsApi)
}else {
  const info = await axios('https://pokeapi.co/api/v2/pokemon?limit=12')
  
  const infoP = [...info.data.results]
  const infoPF = await Promise.all(
      infoP.map((p) => axios.get(p.url))
  )
  let arrayPokemonsApi = []
  infoPF.forEach((p) => {
      arrayPokemonsApi.push({...pInfo(p)})
  })
  const filteredRecipeApi = await arrayPokemonsApi.filter((recipe) =>
  recipe.name.toLowerCase().includes(name))
  return filteredRecipeApi
  //res.status(200).send(filteredRecipeApi)
}
}


// const join = async(req, res, next) => {
//   var joined = (await getPokemonAPI(req)).concat(getPokemonBD(req))
//   res.status(200).send(joined)
// }


const getDbInfoAll = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getApiInfoAll = async () => {
  let info = await axios('https://pokeapi.co/api/v2/pokemon?limit=40')
  let arrayPokemonsApiFinal = []
  // for (var i=0; i<2;i++){
  //   if(i===0){ 
  // }else 
  info = await axios(info.data.next)    
  let infoP = [...info.data.results]
  
  let infoPF = await Promise.all(
      infoP.map((p) => axios.get(p.url))  
  )
  
  let arrayPokemonsApi = []
  infoPF.forEach((p) => {
      arrayPokemonsApi.push({...pInfo(p)})
  })
 // console.log(arrayPokemonsApi)
  // arrayPokemonsApiFinal.concat(arrayPokemonsApi)
  //arrayPokemonsApiFinal.push(arrayPokemonsApi)
  //console.log(arrayPokemonsApiFinal)

//}
  return arrayPokemonsApi
  
}

const getAllPokemon = async () => {
  const apiInfo = await getApiInfoAll();
  const dbInfoBig = await getDbInfoAll();
  //var dbInfoBig = await dbInfo.map(p=>{ return p.name.charAt(0).toUpperCase()+p.name.slice(1),p.life, p.attack, p.defense, p.image})
  // dbInfoBig.forEach((el)=>{
  //   let normal ={
  //       name: el.name.charAt(0).toUpperCase()+el.name.slice(1),
  //       life:el.life,
  //       attack:el.attack,
  //       defense: el.defense,
  //       image: el.image,
  //   }})
   const totalInfo = dbInfoBig.concat(apiInfo);
  return totalInfo;
}; 

// este es para mostrar la informacion segun exista o no el nombre
const joinAllDates = async (req, res) => {
  const { name } = req.query;
  const pokemonTotal = await getAllPokemon(); //toda la informacion se une en 
  if (name) {
    let pokemonTitle = await pokemonTotal.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    pokemonTitle.length
      ? res.status(200).json(pokemonTitle)
      : res.status(404).send("This pokemon doesn't exist -.-");
  } else {
    res.status(200).json(pokemonTotal);
  }
};


const getID = async(req, res, next) => {
  try {
    const { id } = req.params;
   // console.log(id)
    //var PokemonInfo = (await getPokemonAPI(req)).concat( await getPokemonBD(req))
    var PokemonInfo = await getAllPokemon()
    //console.log(PokemonInfo)
    var pokemonId = PokemonInfo.find((el)=>el.id===id);
    //console.log(pokemonId)
    if (pokemonId) {
      return res.json({pokemonId});
    } else {
      return res.json("The Pokemon id doesn't exist");
//      res.status(400).json("The pokemon id doesn't exist");
    }
  } catch (error) {
    console.log(error);
  }
};


const postPokemon = async (req, res, next) => {
  try{
  const {
      name, attack, defense, urlImg, type
    } = req.body;
    if (!name)
      return res.send({
        error: 500,
        message: "You need to enter a name",
      });   
    //var typeNormal = type.name.charAt(0).toUpperCase() + type.name.slice(1)
    
    const perro = await Pokemon.create({name, attack, defense, urlImg})
    
    const typeDbArr = await Type.findAll({
      where: { name: type },
    });
    
    const typeDbId = typeDbArr?.map((p) => p.dataValues.id);
    //console.log(typeDbId)
    await perro.addType(typeDbId);
    //console.log(perro)  
    res.send("pokemon created")
    // Pokemon.create({type})
      // .then((recipeCreated) => {
      //   return recipeCreated.addDiets(diets);
      // })
      // .then((newRecipe) => {
      //   return res.json({
      //     message: "Pokemón Created!",
      //   });
      // })
  }catch(error) { 
          next(error)
      }
  }; 

const getDBInfo = async function () {
    return await Dog.findAll({
      include: {
        model: Temperament,
      },
    });
  };

const ApiToDbTemps = async function () {
    // let AllDataFromApi = await axios.get("https://api.thedogapi.com/v1/breeds");
    // let tempsFromApi = await AllDataFromApi.data.map(
    //   (el) => ` ${el.temperament}`
    // );
    // tempsFromApi = tempsFromApi.join().split(",").sort();
    // tempsFromApi = [...new Set(tempsFromApi)];
    // const formatTemperaments = tempsFromApi
    //   .map((e) => e.trim())
    //   .filter((e) => e !== "undefined");
    // for (let i = 0; i < formatTemperaments.length; i++) {
    //   const e = formatTemperaments[i];
    //   await Temperament.findOrCreate({
    //     where: { name: e },
    //   });
    // }
    let allTemperaments = await Type.findAll();
    return allTemperaments;
    //Retorna los temperamentos de la base de datos
  };

const routerTemps = async (req, res) => {
    try {
      let AllTempsFromDb = await ApiToDbTemps();
      res.status(200).json(AllTempsFromDb);
    } catch (error) {
      console.log(error);
    }
  };

const deletePokemon = async (req, res) => {
    try {
      const { id } = req.params;
      const pokemon = await Pokemon.findByPk(id);
      if (pokemon !== null) {
        await pokemon.destroy();
        res.json("Pokemon deleted correctly");
      }
    } catch (e) {
      return res.status(404).json("Error ---> " + e);
    }
  };


module.exports = {
  joinAllDates,
  postPokemon, 
  getID,
  deletePokemon,
  routerTemps
}