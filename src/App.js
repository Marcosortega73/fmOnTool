
import React from "react"
import { Outlet } from "react-router-dom";

import Navbar from "./components/navbar/menu/Navbar";

//PRUEBA PARA DESABILITAR NAV BAR
import {useSelector} from "react-redux";




function App() {
  const { isLoggedIn, user,permission } = useSelector((state) => state.auth);

  console.log("ESTADO DE LA APP",isLoggedIn,user,permission);
  //PRUEBA PARA DESABILITAR NAV BAR
  
  return (
    <>  
    
      <header style={{margin:0,padding:0,backgroundColor:"#1A2027", maxWidth:"100%"}}>
      {
     isLoggedIn&& permission&&permission.rol ==="MANAGER"?<Navbar />: (!isLoggedIn) ?(<Navbar />):<></>}
      </header>
      <section style ={{display:"flex", justifyContent:"center" }}>
       <Outlet/>
      </section>
    </>
  );
}

export default App;
