import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons, orderAlphabetic, getAllTypes, filteredByType } from '../actions'
import Card from './Card'
import Paginated from "./Paginado";
// import {Link} from 'react-router-dom'
import style from './Home.module.css'
import SearchBar from "./SearchBar";
import NavHome from "./NavHome";
import Loader from "./Loader";



export default function Home () {
    const dispatch = useDispatch()
    const allPokemons = useSelector ((state) => state.pokemons)  //Me trae del reducer el estado dogs con todos los perros
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);  //
    const LastPokemonIndex = currentPage * pokemonsPerPage; //el total de pk x la pag actual nos da el ultimo de la lista
    const FirstPokemonIndex = LastPokemonIndex - pokemonsPerPage;   // 
    const currentPokemons = allPokemons.slice(FirstPokemonIndex, LastPokemonIndex);
    const [order, setOrder] = useState("");
    const allTypes = useSelector((state) => state.types);
    const loader = useSelector((state) => state.loader);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    useEffect (()=>{
        dispatch(getAllPokemons())
    },[dispatch])



    
    return (
        <div className={style.body}>

                <div className={style.navBar}>
                     <NavHome/>
                </div>
                {allPokemons.length > 12 ? (
                     <Paginated
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        paginated={paginated}
                        currentPage={currentPage}
                        />
                    ) : null}
            <div className={style.cardsConteiner}>
            {loader ? (
          <Loader />
        ) : (   
            
                currentPokemons?.map( el => {      //allBreeds?.map( el => { cuando hay ? esta preguntando si hay datos y si hay mapea

                    return (
                         <div key={el.id}> 
                            <Card id={el.id} name={el.name} urlImg={el.urlImg} type={el.type}/>   
                        </div>
                    )   //los fragment son lo mismo que los div pero no dejan "esos" espacios
                })
             )
            }                                     
            </div>            
        </div>

    )


}