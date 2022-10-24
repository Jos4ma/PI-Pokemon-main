import axios from 'axios'

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS'
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME'
export const POST_POKEMON = "POST_POKEMON"  
export const GET_DETAIL = "GET_DETAIL"
export const ORDER_BY_ALPHA = "ORDER_BY_ALPHA"
export const DELETE_POKEMON = "DELETE_POKEMON"
export const FILTERED_BY_TYPE = "FILTERED_BY_TYPE"
export const GET_ALL_TYPES = "GET_ALL_TYPES"
export const ORDER_BY_APIORBD = "ORDER_BY_APIORBD"


export function getAllPokemons(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/allPokemons/')
//        console.log(json.data)
        return dispatch({
            type: 'GET_ALL_POKEMONS',
            payload: json.data //estara buena esta extraccion de datos?
        })
    }
}

export function getPokemonByName(payload) {
    return async function (dispatch) {
      try {
        let pokemonsNames = await axios.get(`http://localhost:3001/allPokemons?name=${payload}`);
        //console.log(pokemonsNames.data)
        return dispatch({
          type: "GET_POKEMON_BY_NAME",
          payload: pokemonsNames.data,
        });
      } catch (error) {
        console.log(error);
        alert("Pokemon not found");
      }
    };
  }

  export function postPokemon(input){
    return async(dispatch)=>{
        const responsePost = await axios.post('http://localhost:3001/allPokemons/create', input);
        input.id = responsePost.data.id;
        dispatch({
            type: "POST_POKEMON",
            payload: input
        })
        alert(responsePost.data.message)
    }
  }

  export function getDetail(payload) {
    return async function (dispatch) {
      try {
        const detail = await axios.get(`http://localhost:3001/allPokemons/detail/${payload}`);
        //console.log(detail.data.result)
        // console.log(detail.data.recipeId)
        return dispatch({
          type: "GET_DETAIL",
          payload: detail.data.pokemonId,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function orderAlphabetic(payload) {
    console.log(payload)
    return {
      type: "ORDER_BY_ALPHA",
      payload,
    };
  }

  export function orderApiOrBd(payload) {
    console.log(payload)
    return {
      type: "ORDER_BY_APIORBD",
      payload,
    };
  }

  export function deletePokemon(id) {
    return async function (dispatch) {
      try {
        console.log(id)
        const deletePokemon = await axios.delete(`http://localhost:3001/allPokemons/delete/${id}`);
        console.log(deletePokemon)
        return dispatch({
          type: "DELETE_POKEMON",
          payload: deletePokemon,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getAllTypes() {
    return async function (dispatch) {
      let temperaments = await axios.get("http://localhost:3001/allPokemons/temperament");
      return dispatch({
        type: "GET_ALL_TYPES",
        payload: temperaments.data,
      });
    };
  }

  export function filteredByType(payload) {
    return {
      type: "FILTERED_BY_TYPE",
      payload,
    };
  }


  //version luciano
  // export function deletePokemon(id) {
  //   return function (dispatch) {
  //     return axios
  //       .delete(`/delete/${id}`)
  //       .then((response) => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Ok",
  //           text: "Pokemon deleted correctly!",
  //         });
  //         return dispatch({ type: actionTypes.DELETE_POKEMON });
  //       })
  //       .catch((e) => {
  //         return Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           html: "Something went wrong!<br> Please try again",
  //         });
  //       });
  //   };
  // }