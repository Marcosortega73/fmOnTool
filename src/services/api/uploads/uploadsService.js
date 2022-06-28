import http from "../../apiAxios";



const API_URL = "uploads/";

const uploadBaseDatosService = async (formData) => {
    console.log("LLEGE AL UPDATE JUGADOR REQ")
try{

    const response  =  http
      .post(API_URL +"jugadores", formData)
      .then((res) => {
            return res.data;
      });
      return response
    }
      catch (error) {
    console.log("LLEGE AL ERROR UPLOAD",error)
  };

  }
 

const jugadoresServices = {

    uploadBaseDatosService,
    


}

export default jugadoresServices