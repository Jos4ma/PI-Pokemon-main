const axios = require('axios')

habilityDataApi = async (responseAPI) => {
    return await {
      name:
        responseAPI.data.name.charAt(0).toUpperCase() +
        responseAPI.data.name.slice(1),
    //   types: responseAPI.data.types?.map((elem) => {
    //     return elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1);
    //   }),
    //   urlImg: responseAPI.data.sprites.other["official-artwork"].front_default,
    //   id: responseAPI.data.id,
    //   height: responseAPI.data.height,
    //   weight: responseAPI.data.weight,
    //   ...responseAPI.data.stats.reduce(
    //     //El metodo reduce me retorna un objeto: {hp: , speed: , attack:  , defense: }
    //     (prevValue, actualValue) => ({
    //       ...prevValue,
    //       [actualValue.stat.name]: actualValue.base_stat,
    //     }),
    //     {}
    //   ),
    //   createInDb: false,
     }
     
  };


module.exports = {habilityDataApi}