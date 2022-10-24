//Componente que renderizara todos los botones de filtrado y busqueda
import SearchBtn from "./SearchBar";
import { useSelector } from "react-redux";
import styles from "./NavHome.module.css";
import {Link} from 'react-router-dom'
import { orderAlphabetic, orderApiOrBd, getAllTypes,filteredByType } from '../actions'
import {useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'


function NavHome( ) {

  const allTypes = useSelector((state) => state.types);

  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");

  useEffect (()=>{
    dispatch(getAllTypes())
  },[dispatch])

  function handleAlphabetic(e) {
    e.preventDefault();
    dispatch(orderAlphabetic(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }
  function handleApiOrbd(e) {
    e.preventDefault();
    dispatch(orderApiOrBd(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }
  function handleType(e) {
    e.preventDefault();
    dispatch(filteredByType(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
//console.log(allTypes)
  return (
    <>
      <ul className={styles.navhome_ul}>
      <h1 className={styles.title}> POKEMONS'LIST </h1>

        <li className={styles.list}>
          <SearchBtn />
            <div>
                <Link to="/create">
                      <button className={styles.link}>Create Pokemón</button>
                </Link>
                <select className={styles.abc} onChange={(e)=>handleAlphabetic(e)}>
                    <option value="asc">Ascendente A to Z</option>
                    <option value="desc">Descendente Z to A</option>
                </select> 
                <select className={styles.abc} onChange={(e)=>handleApiOrbd(e)}>
                    <option value="filterApi">Filter for Api</option>
                    <option value="filterBD">Filter for Data Base</option>
                </select> 
                                
                <select className={styles.type} onChange={(e) => { handleType(e); }}>
                    <option hidden>All types</option>
                      {allTypes?.map((el) => (
                    <option value={el.name} key={el.id}>
                      {el.name}
                    </option>
                    ))}
                </select> 
            </div>
        </li>
      </ul>
    </>
  );
}

export default NavHome;