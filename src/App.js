
import React from "react"
import { Outlet } from "react-router-dom";

import NavBar from "./components/navbar/NavBar";

//PRUEBA PARA DESABILITAR NAV BAR
import {useSelector} from "react-redux";




function App() {
  const { isLoggedIn } = useSelector((state) => state.auth); //PRUEBA PARA DESABILITAR NAV BAR
  return (
    <>
      <header style={{margin:0,padding:0,backgroundColor:"#1A2027", maxWidth:"100%"}}>
      {!isLoggedIn?<NavBar />:<></>}
      </header>
      <section style ={{display:"flex", justifyContent:"center" }}>
       <Outlet/>
      </section>
    </>
  );
}

export default App;
