import {
    GET_ALL_POKEMONS,
    GET_POKEMON_BY_NAME,
    POST_POKEMON,
    GET_DETAIL,
    DELETE_POKEMON,
    ORDER_BY_ALPHA,
    ORDER_BY_APIORBD,
    GET_ALL_TYPES,
    FILTERED_BY_TYPE,
  } from "../actions/index.js";

   const initialState = {
    pokemons: [],
    types: [],
    detail: [],
    allPokemons: [],
    loader: true,
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        // Acá va tu código:
            case GET_ALL_POKEMONS:
                return {
                    ...state,
                    pokemons: action.payload,
                    allPokemons: action.payload,
                    loader: false,
                // all_recipe: action.payload // action, es la funcion del type y traig
            }
            case GET_POKEMON_BY_NAME:
                return {
                    ...state,
                    pokemons: action.payload, // action, es la funcion del type y traig
                    }
            case POST_POKEMON:
                return {
                    ...state
            };
            case GET_DETAIL:
                return {
                    ...state,
                    detail: action.payload,
            };
            case ORDER_BY_ALPHA:
              if (action.payload === "asc") {
                return {
                  ...state,
                  pokemons: state.allPokemons?.slice().sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                  }),
                };
              } else if (action.payload === "desc") {
                return {
                  ...state,
                  pokemons: state.allPokemons?.slice().sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                  }),
                };
              } else {
                return { ...state, pokemons: state.allPokemons };
              }
              case ORDER_BY_APIORBD: 
                let orderedApiOrBd;
                if (action.payload === "filterApi") {
                    let filteredApi = state.allPokemons.filter(a=>{
                      if(a.id.length<4){
                          return a
                      }
                    })
                    orderedApiOrBd = filteredApi
                } 
                else if (action.payload === "filterBD") {
                    let filteredBD = state.allPokemons.filter(a=>{
                    if(a.id.length>4){
                        return a
                    }
                  })
                  console.log(filteredBD)
                  orderedApiOrBd = filteredBD
                }    
                return {
                    ...state,
                    pokemons: orderedApiOrBd,
                  };
            case GET_ALL_TYPES:
                    return {
                      ...state,
                      types: action.payload,
                    };
            case FILTERED_BY_TYPE:
                    console.log(state.allPokemons)
                  let filteredPokemon = state.allPokemons.filter((el) => 
                  el.type?.includes(action.payload) ? el : null 
                );
                return {
                    ...state,
                    pokemons: filteredPokemon,
      };
            case DELETE_POKEMON: {
                return {
                  ...state,
                };
              }
            default:
                return {...state}
           
        };
               
    };
     
    
export default rootReducer;
    
