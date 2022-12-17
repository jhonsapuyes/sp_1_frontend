import axios from "axios";
import React, { Component } from "react";
import Cookies from 'universal-cookie'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import "./PageDeporte.css";

const cookies = new Cookies();
const url= "http://localhost:9000/api/marcadores";

class PageDeporte extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            deporte: "fútbol",
            img: "./assets/user.png",
            modalInsertar: false,
            modalEliminar: false,
            tipoModal:'',
            deporte: "",
            today: new Date(),
            form:{
              mar_id: '',
              mar_fecha_even: "",
              mar_fecha_registro: '',
              mar_hora_event: '',
              mar_hora_registro: '',
              equi_id_1: '',
              equi_id_2: '',
              mar_equi_1: '',
              mar_equi_2: '',
              equi_img_1: '',
              equi_img_2: '',
              mar_dep_id: '',
              mar_usu_id: ''
            }
        };
    }
    peticionPost = async () => {
        delete this.state.form.mar_id //esto borra el campo mar_id
        await axios.post(url, this.state.form).then(response => {
          this.modalInsertar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }

    detectarDeporte(deporte){
        
        if(deporte === "Fútbol"){
            this.setState({
                img: "./assets/user.png",
            });
        }else if(deporte === "Tenis"){
            this.setState({
                img: "./assets/user_tenis.png",
            })
        }else{
            this.setState({
                img: "./assets/user_default.png",
            })
        }
    }
    peticionGet = () => {
        axios.get(url+ "/" + cookies.get('deporte_menu') + "/c/3").then(response => {
          //console.log(response.data);
          this.setState({data:response.data})
        }).catch(error => {
          console.log(error.message);
        })
    }
    modalInsertar = () =>{
        this.setState({modalInsertar:!this.state.modalInsertar})
      }
      handleChange = async e=>{  /// función para capturar los datos del usuario. Es en 2do plano debe ser asincrona
        e.persist();
        
        await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
          form:{
            ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
            [e.target.name]: e.target.value,  /// los nombres de los imputs deben ser iguales a los del arreglo
            mar_fecha_registro: this.state.today.toISOString(),
            mar_hora_registro: this.state.today.toLocaleTimeString('en-US'),
            mar_dep_id: cookies.get('deporte_menu'),
            mar_usu_id: cookies.get('usu_nombre'),
          }
        });
        console.log(this.state.form);  /// probar por consola lo que se guarda
      }
    componentDidMount(){
        this.setState({deporte: cookies.get('deporte_menu')})
        this.detectarDeporte(cookies.get('deporte_menu'));
        this.peticionGet();
    }

    render(){
        const form = this.state.form
        return(
            <>
                <main className="content_deporte">
                    <section className="info_deporte">
                        <article onClick={()=> {this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}} >
                            <div className="icon_equipo"></div>
                            <div className="icon_vs"> vs </div>
                            <div className="icon_equipo"></div>
                            <div className="icon_editar"><FontAwesomeIcon icon={faPen}/></div>
                        </article>
                        <h2>Ya viste el partido?</h2>
                        <p>Cuéntanos como quedo el marcador </p>
                    </section>
                    <section className="img_deporte">
                        <img src={this.state.img}/>
                        <div></div>
                    </section>
                    <section className="tabla_deporte">
                        <h3>RESULTADOS</h3>
                        <table>
                        {this.state.data.map(marcador => {
                            return(
                                <>
                                {(this.state.data.length === 1)?
                                <tr key={marcador.mar_id}>
                                    <td className="marcador_table">No se encuentra resultados</td>
                                </tr>
                                :
                                <tr key={marcador.mar_id}>
                                    <td className="nombre_table left-nombre">{marcador.equi_id_1}</td>
                                    <td className="img_table"><img src={marcador.equi_img_1}/></td>
                                    <td className="marcador_table">{marcador.mar_equi_1} - {marcador.mar_equi_2}</td>
                                    <td className="img_table" ><img  src={`${marcador.equi_img_2}`}/></td>
                                    <td className="nombre_table right-nombre">{marcador.equi_id_2}</td>
                                </tr>
                                }
                                </>
                            )
                        })}
                        </table>
                        <hr/>
                            {(this.state.data.length === 1)?
                                <button className='boton_deporte'><Link to="/PageInicio"> Ir al inicio </Link></button>
                                :
                                <button className='boton_deporte'><Link to="/PageTabla"> Ver más </Link></button>
                            }
                    </section>
                    <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{display:'block'}}>
            </ModalHeader>
            <ModalBody>
              <div>
                <label htmlFor="mar_id">ID</label>
                <input className="form-control" type="text" name="mar_id" id="mar_id" readOnly onChange={this.handleChange} value = {form ? form.mar_id : this.state.data.length+1}></input>
                <br />
                <label htmlFor="equi_id_1">Equipo 1</label>
                <input className="form-control" type="text" name="equi_id_1" id="equi_id_1" onChange={this.handleChange} value = {form ? form.equi_id_1 : ''}></input>
                <br />
                <label htmlFor="equi_id_2">Equipo 2</label>
                <input className="form-control" type="text" name="equi_id_2" id="equi_id_2" onChange={this.handleChange} value = {form ? form.equi_id_2 : ''}></input>
                <br />
                <label htmlFor="equi_img_1">Logo 1</label>
                <input className="form-control" type="url" name="equi_img_1" id="equi_img_1" onChange={this.handleChange} value = {form ? form.equi_img_1 : ''}></input>
                <br />
                <label htmlFor="equi_img_2">Logo 2</label>
                <input className="form-control" type="url" name="equi_img_2" id="equi_img_2" onChange={this.handleChange} value = {form ? form.equi_img_2 : ''}></input>
                <br />
                <label htmlFor="mar_equi_1">mar_equi_1</label>
                <input className="form-control" type="text" name="mar_equi_1" id="mar_equi_1" onChange={this.handleChange} value = {form ? form.mar_equi_1 : ''}></input>
                <br />
                <label htmlFor="mar_equi_2">mar_equi_1</label>
                <input className="form-control" type="text" name="mar_equi_2" id="mar_equi_2" onChange={this.handleChange} value = {form ? form.mar_equi_2 : ''}></input>
                <br />
                <label htmlFor="mar_fecha_event">mar_fecha_event</label>
                <input className="form-control" type="date" name="mar_fecha_event" id="mar_fecha_event" onChange={this.handleChange} value = {form ? form.mar_fecha_event : ''}></input>
                <br />
                <label htmlFor="mar_hora_event">mar_hora_event</label>
                <input className="form-control" type="time" name="mar_hora_event" id="mar_hora_event" onChange={this.handleChange} value = {form ? form.mar_hora_event : ''}></input>
                <br />
                
              </div>
            </ModalBody>
            <ModalFooter>
              {
                this.state.tipoModal === 'insertar' ?
                <button className="btn btn-success" onClick={()=> this.peticionPost()}>Insertar</button>
                :
                <button className="btn btn-success" onClick={()=> this.peticionPut()}>Modificar</button>
              }
              <button className="btn btn-danger" onClick={()=> this.modalInsertar()} >Cancelar</button>
            </ModalFooter>
          </Modal>
                </main>
            </>
            
        )
    }
}

export default PageDeporte;
