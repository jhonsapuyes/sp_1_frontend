import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import "./PageAgregar.css";
import Cookies from 'universal-cookie';
const field_id = '/dep_id/'

const url_deportes= "http://localhost:9000/api/"
const url_equipos= "http://localhost:9000/api/"

const cookies = new Cookies();

class PageAgregar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          modalInsertar: false,
          modalEliminar: false,
          tipoModal:'',
          ventana: 'deportes',
          form_deporte:{
            dep_id: '',
            dep_nombre: "",
          },
          form_equipo:{
            equi_id: '',
            equi_nombre: "",
            equi_img: "",
            dep_id: "",
          }
        };
    }


    peticionGet = () => {
      axios.get(url_deportes+cookies.get('agregar_menu')).then(response => {
        this.setState({data:response.data})
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionPost = async () => {
      (cookies.get('agregar_menu') === "equipos")?
      delete this.state.form_deporte.dep_id: delete this.state.form_equipo.equi_id; //esto borra el campo mar_id
      (cookies.get('agregar_menu') === "equipos")?   
      await axios.post(url_deportes+cookies.get('agregar_menu'), this.state.form_deporte).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
      :
      await axios.post(url_deportes+cookies.get('agregar_menu'), this.state.form_equipo).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionPut = () => {
      axios.put(url_deportes+field_id+this.state.form.mar_id,this.state.form).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionDelete = () => {
      axios.delete(url_deportes+field_id+this.state.form.mar_id).then(response => {
        this.modalEliminar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
  
    seleccionarUsuario=(equipo)=>{
      (cookies.get('agregar_menu') === "equipos")? 
      this.setState({
        tipoModal: 'actualizar',
        form_deporte: {
          dep_id: equipo.dep_id,
          dep_nombre: equipo.dep_nombre,
        }
      })
      :
      this.setState({
        tipoModal: 'actualizar',
        form_equipo: {
          dep_id: equipo.dep_id,
          dep_nombre: equipo.dep_nombre,
        }
      })
    }
  
    modalInsertar = () =>{
      this.setState({modalInsertar:!this.state.modalInsertar})
    }
  
    modalEliminar = () =>{
      this.setState({modalEliminar:!this.state.modalEliminar})
    }
  
    handleChange = async e=>{  /// función para capturar los datos del usuario. Es en 2do plano debe ser asincrona
      e.persist();
      (cookies.get('agregar_menu') === "equipos")?      /// y por eso debemos especificar persistencia
      await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
        form:{
          ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
          [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
        }
      })
      :
      await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
        form:{
          ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
          [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
        }
      })
      console.log(this.state.form);  /// probar por consola lo que se guarda
    }
  
    //se ejecuta cuando lo realiza
    componentDidMount(){
      this.setState({ventana: cookies.get('agregar_menu')});
      this.peticionGet();
    }
  
    render(){  
  
      const form = this.state.form
  
      return (
        <div className="App content_tabla" >
          <br /><br /><br />
          <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}} >{`Agregar Juego de ${this.state.ventana}`}</button>
          <br /><br />
          <table className="table tabla">
          <thead>
            {(this.state.ventana === 'equipos') ?
            <tr>
              <th>Equipo id</th>
              <th>Equipo</th>
              <th>Logo</th>
              <th>dep_id</th>
              <th>acciones</th>
            </tr>
            :
            <tr>
              <th>Deportes id</th>
              <th>Deporte</th>
              <th>acciones</th>
            </tr>
            }
          </thead>
          <tbody>
            {( this.state.ventana === 'equipos') ?
            this.state.data.map(equipo => {
              return(
                <tr key={equipo.equi_id}>
                  <td>{equipo.equi_id}</td>
                  <td><img className="tabla_img" src={(equipo.equi_img)?equipo.equi_img:"./assets/Logo192.png"}/></td>
                  <td>{equipo.equi_nombre}</td>
                  <td>{equipo.dep_id}</td>
                  <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarUsuario(equipo); this.modalInsertar()}}/></button>
                      {" "}
                      <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarUsuario(equipo); this.modalEliminar()}}/></button>
                  </td> 
                </tr>
              )
            }):
            this.state.data.map(deporte => {
                return(
                  <tr key={deporte.dep_id}>
                    <td>{deporte.dep_id}</td> 
                    <td>{deporte.dep_nombre}</td> 
                    <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarUsuario(deporte); this.modalInsertar()}}/></button>
                        {" "}
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarUsuario(deporte); this.modalEliminar()}}/></button>
                    </td> 
                  </tr>
                )
              })
            }
          </tbody>
          </table>
  
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{display:'block'}}>
            </ModalHeader>
            <ModalBody>
              {(this.state.ventana === 'equipos')?
              <div>
              <label htmlFor="equi_id">ID</label>
              <input className="form-control" type="text" name="equi_id" id="equi_id" readOnly onChange={this.handleChange} value = {form ? form.equi_id : this.state.data.length+1}></input>
              <br />
              <label htmlFor="equi_nombre">nombre</label>
              <input className="form-control" type="text" name="equi_nombre" id="equi_nombre" onChange={this.handleChange} value = {form ? form.equi_nombre : ''}></input>
              <br />
              <label htmlFor="equi_img">Logo</label>
              <input className="form-control" type="text" name="equi_img" id="equi_img" onChange={this.handleChange} value = {form ? form.equi_img : ''}></input>
              <br />
              <label htmlFor="dep_id">Deporte</label>
              <input className="form-control" type="text" name="dep_id" id="dep_id" onChange={this.handleChange} value = {form ? form.dep_id : ''}></input>
              <br />
            </div>
            :
            <div>
                <label htmlFor="dep_id">ID</label>
                <input className="form-control" type="text" name="dep_id" id="dep_id" readOnly onChange={this.handleChange} value = {form ? form.dep_id : this.state.data.length+1}></input>
                <br />
                <label htmlFor="dep_nombre">Deporte</label>
                <input className="form-control" type="text" name="dep_nombre" id="dep_nombre" onChange={this.handleChange} value = {form ? form.dep_nombre : ''}></input>
                <br />
                
              </div>
              }
            
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
  
          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
              ¿Estas seguro que deseas eliminar?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=> this.peticionDelete()} >Si</button>
              <button className="btn btn-success" onClick={()=> this.modalEliminar()} >No</button>
            </ModalFooter>
          </Modal>
  
        </div>
    )}
}

export default PageAgregar;
