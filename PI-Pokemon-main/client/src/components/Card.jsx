import React from 'react'
import {Link} from 'react-router-dom'
import style from './Card.module.css' 


export default function Card({id, name, urlImg, type}){
    return (
        <div className={style.card} key={id}>
            <h3 className={style.name}>{name}</h3>
            {type?.map((type,i)=>(
                <h5 key={i} className={style.type}>{type}</h5>
            ))}            
            
        
            
                {id.length<4?<img src={urlImg} alt="img not found" className={style.urlImg} />:   
                <img src={urlImg} alt="img not found" className={style.urlImg2} />}
                {/* {type?.map((type,i)=>(
                <span key={i}> | {type} </span>
            ))} */}
                <Link to={`/detail/${id}`}>
                    <button className={style.button}>Pokemon individual info</button>
                </Link>
        </div> 
    )
}