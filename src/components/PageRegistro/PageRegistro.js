import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './PageRegistro.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookies from 'universal-cookie'
import axios from 'axios'

//import Cookies from 'universal-cookie'

const urlRegsitro="http://localhost:9000/api/usuarios"


const cookies = new Cookies();


class PageRegistro extends Component {
    state={
        form:{
            usu_nombre:'', 
            usu_access:'User', 
            usu_email:'',  
            usu_clave:'' 
        }
        
    }

    handleChange=async e=>{
        //e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
        //console.log(this.state.form)
    }

    suscribirse=async()=>{
        let name=this.state.form.usu_nombre
        let acc=this.state.form.usu_access
        let email=this.state.form.usu_email
        let pwd=this.state.form.usu_clave

        if(name.length<=0 || pwd.length<=0 || acc.length<=0 || email.length<=0){
            alert('Se requieren todos los datos')
            return "Algunos o Todos Los Estan Datos Vacios"
        }else{
            cookies.set("usu_email",email,{path:"/"})
            cookies.set("usu_nombre",name,{path:"/"})
            cookies.set("usu_access",acc,{path:"/"})
        }
        
        await axios
        .post(urlRegsitro,this.state.form)
        .then(response=>{
            //console.log(response.data)
            window.location.href='./'
        })
        .catch(error=>{
            console.log(error)
        })

    }


    render() {
        return(
            <div className="formulario_login">
            <div className="formulario_items">
              <div className="formulario_header">
                <img src="./assets/Logo_color.png"/>
                <h2> Registro </h2>
              </div>
              <form className="formulario_form">
                <label htmlFor='usu_email'>Correo</label>
                <input type="email" name="usu_email" id='usu_email' onChange={this.handleChange}></input>
                <label htmlFor='usu_clave'>Contraseña</label>
                <input type="password" name="usu_clave" id='usu_clave' onChange={this.handleChange}></input>
                <label htmlFor='usu_nombre'>Nombre</label>
                <input type="text" name="usu_nombre" id='usu_nombre' onChange={this.handleChange}></input>
                <button className='boton-login' onClick={() => this.suscribirse()}>Registrarse</button>
              </form>
              <p>¿Ya tienes una cuenta? <Link to="/PageSesion">Inicia sesión</Link> </p>
            </div>
            <div className="formulario_img">
              <img src="./assets/img_registrarse.png"/>
            </div>
            <div className="icon_menu_top2" onClick={()=>window.location.href='./PageInicio'}>
              <div></div>
              <div></div>
              <div></div>
            </div>
        </div>
        )
    }
}

export default PageRegistro;