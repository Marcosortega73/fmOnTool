import React from "react";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const { isLoggedIn,permission } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log("Home");
    if(permission && permission.rol === "ADMIN"){
      navigate("/panelAdministracion/dashboard");
      }
    if(permission && permission.rol === "MANAGER"){
      navigate("/profile");
      }
     } , [permission,navigate]);

  return (
    <> 
    {isLoggedIn ? (
      <h1>{permission.email} : {permission.rol}</h1>
      
    
    ) : (
      <h1>Home</h1>
   ) }
    
    
    
    
    
    </>
  )
}

export default Home