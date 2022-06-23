import http from "../../apiAxios";


const API_URL = "jugadores/";
const getJugadoresService = async () => {
    console.log("LLEGE AL USER ADMIN SERVICE")
try{
    const data  =  http
      .get(API_URL+"obtenerJugadores")
      .then((response) => {
            console.log("LLEGE AL LA DATA JUGADORESasdasd VEVO",response.data)
            return response.data.players;
      });
      return data
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}

const createJugadorService = async (jugador) => {
    console.log("LLEGE AL USER ADMIN SERVICE")
try{
    const data  =  http
      .post(API_URL +"crearJugador", jugador)
      .then((response) => {
            console.log("LLEGE AL LA DATA JUGADORES VEVO",response.data)
            return response.data;
      });
      return data

  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}
const jugadoresServices = {
    getJugadoresService,
    createJugadorService

}

export default jugadoresServices