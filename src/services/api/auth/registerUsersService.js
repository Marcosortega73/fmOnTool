
import http from "../../apiAxios";
/*
    #TODO:Prueba con administradores
*/
/* const API_URL = "administradores/"; */
 

const registerAdmin = async (userData) => {
  const response = await http
    .post("administradores/register", userData)
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

const registerManager = async (userData) => {
  
    const response = await http
      .post("manager/register", userData)
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



  const registerUsersService = {
    registerAdmin,
    registerManager,

  };


export default registerUsersService;
