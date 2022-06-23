import http from "../../apiAxios";


const API_URL = "nacionalidad/obtenerNacionalidades";
const getNacionalidades = async () => {
    console.log("LLEGE AL USER obtenerNacionalidades SERVICE")
try{
    const data  =  http
      .get(API_URL)
      .then((response) => {
            console.log("LLEGE AL LA DATA obtenerNacionalidades VEVO",response.data)
            return response.data;
      });
      return data
    
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}
const nacionalidadServices = {
    getNacionalidades,

}

export default nacionalidadServices