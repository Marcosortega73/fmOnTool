import http from "../../apiAxios";


const API_URL = "equipos/";
const getEquipos = async () => {
    console.log("LLEGE AL USER ADMIN SERVICE")
try{
    const data  =  http
      .get(API_URL+"obtenerEquipos")
      .then((response) => {
            console.log("LLEGE AL LA DATA equipos VEVO",response.data)
            return response.data;
      });
      return data
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}
const createEquipos = async (equipo) => {
  console.log("LLEGE AL USER ADMIN SERVICE")
try{
  const data  =  http
    .post(API_URL+"createEquipo",equipo)
    .then((response) => {
          console.log("Creando Equipo",response.data)
          return response.data;
    });
    return data
  
}
catch (error) {
  console.log("LLEGE AL ERROR",error)
};
}
const deleteEquipos = async () => {
  console.log("LLEGE AL USER ADMIN SERVICE")
try{
  const data  =  http
    .get(API_URL+"deleteEquipo")
    .then((response) => {
          console.log("LLEGE AL LA DATA equipos VEVO",response.data)
          return response.data;
    });
    return data
  
}
catch (error) {
  console.log("LLEGE AL ERROR",error)
};
}
const updateEquipos = async () => {
  console.log("LLEGE AL USER ADMIN SERVICE")
try{
  const data  =  http
    .get(API_URL+"updateEquipo")
    .then((response) => {
          console.log("LLEGE AL LA DATA equipos VEVO",response.data)
          return response.data;
    });
    return data
  
}
catch (error) {
  console.log("LLEGE AL ERROR",error)
};
}
const equiposServices = {
    getEquipos,
    createEquipos,
    deleteEquipos,
    updateEquipos

}

export default equiposServices