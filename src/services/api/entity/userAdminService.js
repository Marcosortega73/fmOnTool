import http from "../../apiAxios";
/*
    #TODO:Prueba con administradores
*/
import axios from "axios";

const API_URL = "http://localhost:3030/api/administradores";


const userAdminService = async ({token}) => {
    console.log("LLEGE AL USER ADMIN SERVICE")
try{
    if (token) {
    const data  =  await axios
      .get(API_URL + "/dataUser", { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
            console.log("LLEGE AL LA DATA USERADMIN",response.data)
            localStorage.setItem("credenttials", JSON.stringify(response.data));
            return response.data;
      });
      return data
    }
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}
 

export default userAdminService;