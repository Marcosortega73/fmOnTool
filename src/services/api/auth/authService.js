import axios from "axios";
/*
    #TODO:Prueba con administradores
*/
const API_URL = "http://localhost:3030/api/administradores/";

const registerAdmin = async (userData) => {
console.log("LLEGE AL REGISTER",userData)

  const response = await axios
    .post(API_URL+"register", userData)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
        console.log(err);
        return err
      
    });
    return response
};
const login = async (userData) => {
    
    return await axios
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
    localStorage.removeItem("credenttials");
  };
  const authService = {
    registerAdmin,
    login,
    logout,
  };


export default authService;
