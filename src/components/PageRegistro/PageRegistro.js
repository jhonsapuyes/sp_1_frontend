import React, { Component } from 'react'

import './PageRegistro.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

//import Cookies from 'universal-cookie'

const urlRegsitro="http://localhost:9000/api/usuarios"


//const cookies = new Cookies();


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
        <div className="containerPrincipal">
            <div className="containerSecundario">
                <div className="form-group">
                    <label>email:</label>
                    <br />
                    <input
                        type="email"
                        className="form-control"
                        name="usu_email"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="usu_clave"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>Nombre: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="usu_nombre"
                        onChange={this.handleChange}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={() => this.suscribirse()}>Registrarse</button>
                </div>
            </div>
        </div>
        )
    }
}

export default PageRegistro;