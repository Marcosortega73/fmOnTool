import React from 'react';

import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import App from '../App';

//Vistas Generales
import Home from '../views/Home';

//Auth
import Login from '../views/auth/Login.jsx';
import Register from '../views/auth/Register.jsx';

//Panel Administracion
import PanelAdministracion from '../views/panelAdmin/PanelAdministracion.jsx';
import Dashboard from '../views/panelAdmin/navegacion/Dashboard';

//Generales
import NotFound from '../views/NotFound.jsx';
import SitioEnConstruccion from '../views/SitioEnConstruccion.jsx';
import customThemeBox from '../styles/themes/themeConfig';
import dataPanel from '../utils/panel.json';
import dataPanelSecond from '../utils/panelDataSecond.json';

 import { useSelector } from 'react-redux';
import ElComunitario from '../views/panelAdmin/navegacion/ElComunitario';
import Torneos from '../views/panelAdmin/navegacion/Torneos';
import Estadisticas from '../views/panelAdmin/navegacion/Estadisticas';
import Partidos from '../views/panelAdmin/navegacion/Partidos';
import Equipos from '../views/panelAdmin/navegacion/Equipos';
import Managers from '../views/panelAdmin/navegacion/Managers';
import Jugadores from '../views/panelAdmin/navegacion/Jugadores';
import Apuestas from '../views/panelAdmin/navegacion/Apuestas';
import LigasDelMundo from '../views/panelAdmin/navegacion/LigasDelMundo';

const AppRouter = () => {

    const { isLoggedIn } = useSelector((state) => state.auth);
    
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} >
        <Route path="/" element={<Navigate to="inicio" />} />
        <Route  index path="inicio" element={<Home/>} />
        <Route path="login" element={<Login  data={customThemeBox}/>} />
        <Route path="register" element={!isLoggedIn?<Register data={customThemeBox}/>:<Navigate to="/panelAdministracion" replace={true} />} />
        {/*NavBar*/}
        <Route path="torneos-y-competencias" element={<SitioEnConstruccion/>} />
        <Route path="el-comunitario" element={<SitioEnConstruccion/>} />
        <Route path="apuestas" element={<SitioEnConstruccion/>} />
        <Route path="conviertete-en-manager" element={<SitioEnConstruccion/>} />
        <Route path="ligas-del-mundo" element={<SitioEnConstruccion/>} />
        <Route path="*" element={<NotFound />} />
    </Route>

    <Route path="panelAdministracion" element={isLoggedIn?<PanelAdministracion data={dataPanel}  dataSecond={dataPanelSecond}/>:  <Navigate to="/login" replace={true} />} >
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="jugadores" element={<Jugadores/>} />
            <Route path="managers" element={<Managers/>} />
            <Route path="equipos" element={<Equipos/>} />
            <Route path="partidos" element={<Partidos/>} />
            <Route path="estadisticas" element={<Estadisticas/>} />
            <Route path="torneos" element={<Torneos/>} />
            <Route path="el-comunitario" element={<ElComunitario/>} />
            <Route path="apuestas" element={<Apuestas/>} />
            <Route path="ligas-del-mundo" element={<LigasDelMundo/>} /> 
        </Route>
      
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
