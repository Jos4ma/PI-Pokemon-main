
import {
    wrapperPagination,
    pagination,
    pagination__item,
    pagination__link,
    is_active,
    prevNextPageBtn,
  } from "./Paginado.module.css";
import React from "react";

export default function Paginated({
  pokemonsPerPage,
  allPokemons,
  paginated,
  currentPage,
}) {
  let pageNumber = [];
    //console.log(currentPage)
  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <div className={wrapperPagination}>
      <nav>
        <ul className={pagination}>
          {currentPage > 1 ? (
            <li className={pagination__item} onClick={() => paginated(currentPage - 1)}>
              <button className={prevNextPageBtn}>Prev</button>
            </li>
          ) : null}
          <li className={pagination__item} onClick={() => paginated(currentPage)}>
            <button className={pagination__link}>{currentPage}</button>
          </li>
          {currentPage < allPokemons / pokemonsPerPage ? (
            <li className={pagination__item} onClick={() => paginated(currentPage + 1)}>
              <button className={prevNextPageBtn}>Next</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}