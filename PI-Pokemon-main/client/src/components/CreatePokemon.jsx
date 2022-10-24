import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon } from "../actions";
import style from "./CreatePokemon.module.css";

export default function CreatePokemon() {
  //const defaultImage = 'https://media.gettyimages.com/photos/pickachu-toy-character-from-pokemon-anime-picture-id534195339'   
  const defaultImage = "https://i.pinimg.com/originals/53/53/12/53531220d49783f59ebd9dae46b63b86.jpg"
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  //const temperament = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  let [input, setInput] = useState({
    name: "",
    attack: "",
    attack: "",
    urlImg: "",
    type: "",
  });

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length === 0 ) {
      // input.name = input.name.charAt(0).toUpperCase()+input.name.slice(1)
      if (!input.urlImg) input.urlImg=defaultImage
      dispatch(postPokemon(input));
      alert("¡Pokemon successfully created!");
      navigate("/home");
    } else {
      alert(
        "All information about the new pokemon must be completed and valid, also you have to select a temperament"
      );
    }
  }

  function handleSelect(e) {
    if (input.temperament.length < 4) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
      let temps = input.temperament;
      let findTemp = temps.indexOf(e.target.value);
      if (findTemp >= 0) {
        temps.splice(findTemp, 1);
      } else {
        temps.push(e.target.value);
      }
      setInput({
        ...input,
        temperament: temps,
      });
    } else {
      alert("You can only select 4 temperaments");
    }
  }

  function handleDeleteTemperaments(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== e),
    });
  }

//   useEffect(() => {
//     dispatch(getTemperaments());
//   }, [dispatch]);

  return (
    <div className={style.background}>
      <div className={style.frame}>
      <div className={style.title_create}>
        <h1>CREATE YOUR OWN POKEMON</h1>
      </div>

      <div className={style.dogCreate}>
        <div className={style.created}>
          <form className={style.form}  onSubmit={(e) => handleSubmit(e)}>
            <div className={style.inputDiv}>
              <label className={style.label}>Name : </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="name"
                value={input.name=input.name.charAt(0).toUpperCase()+input.name.slice(1)}
                required
              />
              <span >
                {errors.name && <p>{errors.name}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Attack : </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="attack"
                value={input.attack}
                required
              />
              <span >
                {errors.attack && <p>{errors.attack}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Defense : </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="defense"
                value={input.defense}
                required
              />
              <span >
                {errors.defense && <p>{errors.defense}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Type : </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="type"
                value={input.type}
                required
              />
              <span >
                {errors.type && <p>{errors.type}</p>}
              </span>
            </div>
            {/* <div className={style.inputDiv}>
              <label className={style.label}>Image </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="image"
                value={input.image}
                required
              />
              <span >
                {errors.image && <p>{errors.image}</p>}
              </span>
            </div> */}
            <div>
            {input.urlImg!==''? 
               (<img src={input.urlImg} alt='new pokemon' width='240px' height='200px' />) :
               (<img src={defaultImage}  alt='new pokemon' className={style.image} />)}
               <hr/>
            
            <label className={style.labelLink}>
             {errors.urlImg? <span className={style.error}>{errors.urlImg}</span> :
            <span  htmlFor="image" className={style.span}>URL IMAGE: </span>}
            <input name='urlImg'
            className={style.input}
            type='url'
            placeholder="Add link of image"
             onChange={(e) => handleInputChange(e)}
             //porque no funciona la ter
             value={input.urlImg} />
            </label>
             <hr/>
            </div>



            <div >
              <button className={style.buttonCreate} type="submit">
                CREATE A POKEMON
              </button>
            </div>
          </form>
          <div >
            <Link to="/home">
              <button className={style.buttonToHome}>HOME</button>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(input.name)) {
    errors.name = "Name can only contain letters";
  } else if (!input.name || input.name.length > 10){
    errors.name = "Name is required with no more than 10 characters";
  } else if (!input.name || input.name.length > 10)
    errors.name = "Name is with the first letter big";
  if (input.attack < 0 || input.attack > 200)
    errors.attack = "Invalid! Range between 0 - 200";
  if (input.defense < 0 || input.defense > 200)
    errors.defense = "Invalid! Range between 0 - 200";
  if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(input.type))
    errors.type = "Type can only contain letters";

  return errors;
}

// const urlValidation = (URL) => {
//   const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/);
//   return regex.test(URL);
// };
