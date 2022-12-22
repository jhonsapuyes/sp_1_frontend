import React, { Component } from "react";
import axios from "axios"
import './PageSesion.css'
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

//const url= "http://localhost:9000/api/usuarios";
const url= "http://129.151.118.62:9000/api/usuarios";

class PageSesion extends Component {
  state={
    form:{
        username: '',
        password: ''
    }
}

handleChange=async e=>{
    await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]:e.target.value
        }
    })
    //console.log(this.state.form)
}

iniciarSesion=async()=>{
    let name=this.state.form.username
    let pwd=this.state.form.password
    if(name.length<=0 || pwd.length<=0){
        alert('Se requieren todos los datos')
        return "Datos Vacios"
    }else{
      await axios.get(url+"/"+name+"/"+pwd)
      .then(response=>{
          //console.log(response.data)
          return response.data
      }).then(response=>{
        if(response.length>0){
            var resp=response[0] // para evitar llamados tan largos con corchetes
            cookies.set("usu_email",resp.usu_email,{path:"/"})
            cookies.set("usu_nombre",resp.usu_nombre,{path:"/"})
            cookies.set("usu_access",resp.usu_access,{path:"/"})
            cookies.set("usu_id",resp.usu_id,{path:"/"})
            window.location.href = "./"
          }else{
              alert("Verificar Usario y/o Clave")
          }
      })
      .catch(error=>{
          console.log(error)
      })
    }
}

    //render
    render(){
        return(
            <div className="formulario_login">
                <div className="formulario_items">
                  <div className="formulario_header">
                    <img src="./assets/Logo_color.png"/>
                    <h2> Iniciar Sesión </h2>
                  </div>
                  <form className="formulario_form">
                    <label htmlFor='username'>Nombre</label>
                    <input type="text" name="username" id='username' onChange={this.handleChange}></input>
                    <label htmlFor='password'>Contraseña</label>
                    <input type="password" name="password" id='password' onChange={this.handleChange}></input>
                    <p className='boton-login' onClick={() => this.iniciarSesion()}>LOGIN</p>
                  </form>
                  <p>¿Todavía no tienes una cuenta? <Link to="/PageRegistro">Regístrate</Link> </p>
                </div>
                <div className="formulario_img">
                  <img src="./assets/img_login.png"/>
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

export default PageSesion;
