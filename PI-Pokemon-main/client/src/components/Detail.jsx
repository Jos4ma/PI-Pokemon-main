import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getDetail, cleaner, cleanDog, deletePokemon } from '../actions'
import { useParams } from 'react-router'
import style from './Detail.module.css'

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
    //    dispatch(cleaner());
        dispatch(getDetail(id));
    //    dispatch(cleanDog());
      }, [dispatch, id]);

const pokemonDetail = useSelector((state) => state.detail);

function handleDelete(e) {
    if (pokemonDetail.id.length > 5) {
        e.preventDefault();
        dispatch(deletePokemon(id));
 //     dispatch(cleaner());
        alert("The pokemon was successfully deleted");
        navigate("/home");
    }
  }

  return (
    <div className={style.detail}>
      {pokemonDetail.id ? ( 
            <div>
                <div className={style.first}>
                    <img className={style.img} src={pokemonDetail.urlImg} alt="Not Found" />        
                    <p className="text-7xl">Pokemon name: {pokemonDetail.name} </p>    

                    <h5 className={style.h5}>ID: {pokemonDetail.id} </h5>        
                    <h5 className={style.h5}>HEALTH: {pokemonDetail.health} </h5>
                    <h5 className={style.h5}>ATTACK: {pokemonDetail.attack} </h5>
                    {pokemonDetail.type?.map((type,i)=>(
                      <h5 key={i} className={style.h5} >{type}</h5>
                    ))}

                    <Link to={"/home"}>
                        <button className={style.button}>HOME</button>
                    </Link>
                    {pokemonDetail.id.length > 5 ? (
                      <button className={style.button}  onClick={(e) => handleDelete(e)}>
                        DELETE THIS POKEMON
                      </button>
                    ) : null}
                </div>
                
            </div>         
            ) : (
          <h1 className={style.h1}> Loading... </h1>
       ) }  
    </div>
  );
  // return (
  //   <div className={style.detail}>
  //     {pokemonDetail.id ? ( 
  //           <div>
  //               <div className={style.first}>
  //                   <img className={style.img} src={pokemonDetail.urlImg} alt="Not Found" />        
  //                   <h2 className={style.h2}>Pokemon name: {pokemonDetail.name} </h2>    

  //                   <h5 className={style.h5}>ID: {pokemonDetail.id} </h5>        
  //                   <h5 className={style.h5}>HEALTH: {pokemonDetail.health} </h5>
  //                   <h5 className={style.h5}>ATTACK: {pokemonDetail.attack} </h5>
  //                   {pokemonDetail.type?.map((type,i)=>(
  //                     <h5 key={i} className={style.h5} >{type}</h5>
  //                   ))}

  //                   <Link to={"/home"}>
  //                       <button className={style.button}>HOME</button>
  //                   </Link>
  //                   {pokemonDetail.id.length > 5 ? (
  //                 <button className={style.button}  onClick={(e) => handleDelete(e)}>
  //                     DELETE THIS POKEMON
  //                 </button>
  //               ) : null}
  //               </div>
                
  //           </div>         
  //           ) : (
  //         <h1 className={style.h1}> Loading... </h1>
  //      ) }  
  //   </div>
  // );

}
