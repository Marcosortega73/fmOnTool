
import http from "../../apiAxios";
/*
    #TODO:Prueba con administradores
*/
const API_URL = "userPending/";
 
const login = async (userData) => {
    
    return await http
      .post(API_URL + "login", userData)
      .then((response) => {
        if (response.data.token) {
            console.log("LLEGE AL LOGIN",response.data)
           localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("credentials");
  };
  const getDataUserService = async ({token}) => {
    console.log("LLEGE Data User, token",token)
try{
    if (token) {
    const data  =  await http
      .get(API_URL + "/dataUser", { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
            console.log("LLEGE AL LA DATA USERADMIN",response.data)
            localStorage.setItem("credentials", JSON.stringify(response.data));
            return response.data;
      });
      return data
    }
  }
  catch (error) {
    console.log("LLEGE AL ERROR",error)
  };
}
  const authService = {
    login,
    logout,
    getDataUserService
  };


export default authService;
