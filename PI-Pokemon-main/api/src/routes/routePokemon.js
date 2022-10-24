const router = require("express").Router()
const {joinAllDates, postPokemon, getID, deletePokemon, routerTemps} = require("../controllers/controllers")

console.log(joinAllDates)
router.get("/", joinAllDates)
router.get("/detail/:id", getID)
router.use("/temperament", routerTemps);
router.post("/create", postPokemon)
router.delete("/delete/:id", deletePokemon)


module.exports = router



//oye perrita yo quiero trabajar contigo, realmente creo que podria ser buena idea
//pero no te veo tan convencido de que podamos ganar plata y tampoco te quiero forzar asi que buscaré pega con otra persona si es que se puede