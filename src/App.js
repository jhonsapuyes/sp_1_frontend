import './App.css';

import "bootstrap/dist/css/bootstrap.min.css"

import {Component} from 'react'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import  Menu  from "./components/Menu/Menu"
import PageInicio from './components/PageInicio/PageInicio';
import PageDeporte from './components/PageDeporte/PageDeporte';
import PageSesion from './components/PageSesion/PageSesion';
import PageUsuarios from './components/PageUsuarios/PageUsuarios';
import PageTabla from './components/PageTabla/PageTabla';
import PageRegistro from'./components/PageRegistro/PageRegistro';
import NoPage from './components/NoPage/NoPage';
import PageAgregar from './components/PageAgregar/PageAgregar';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

class App extends Component {



render() {
    return(
      <>
        <BrowserRouter >
          <Menu />
          <Routes>
            <Route path="/" element={<PageInicio/>}/>
            <Route path="/PageInicio" element={<PageInicio/>}/>
            <Route path="/PageDeporte" element={<PageDeporte/>}/>
            <Route path="/PageSesion" element={ <PageSesion/>}/>
            <Route path="/PageUsuarios" element={((cookies.get("usu_access") === "Admin")? <PageUsuarios/>: <PageInicio/> )}/>
            <Route path="/PageTabla" element={<PageTabla/>}/>
            <Route path="/PageAgregar" element={((cookies.get("usu_access") === "Admin")? <PageAgregar/>: <PageInicio/> )}/>
            <Route path="/PageRegistro" element={<PageRegistro/>}/>
            <Route path="*" element={<NoPage/>} />
          </Routes>
        </BrowserRouter>

      </>
    );
  }
}
export default App;
