import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import "./PageTabla.css";
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const field_id = '/mar_id/'
const url= "http://localhost:9000/api/marcadores";

class PageTabla extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          modalInsertar: false,
          modalEliminar: false,
          tipoModal:'',
          deporte: "",
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
            mar_dep_id: '',
            mar_usu_id: ''
          }
        };
    }


    peticionGet = () => {
      axios.get(url+ "/" + cookies.get('deporte_menu') + "/c").then(response => {
        //console.log(response.data);
        this.setState({data:response.data})
      }).catch(error => {
        console.log(error.message);
      })
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
  
    peticionPut = () => {
      axios.put(url+field_id+this.state.form.mar_id,this.state.form).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionDelete = () => {
      axios.delete(url+field_id+this.state.form.mar_id).then(response => {
        this.modalEliminar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
  
    seleccionarUsuario=(marcador)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
            mar_id: marcador.mar_id,
            mar_fecha_event: marcador.mar_fecha_event,
            mar_fecha_registro: marcador.mar_fecha_registro,
            mar_hora_event:marcador.mar_hora_event,
            mar_hora_registro: marcador.mar_hora_registro,
            mar_equi_1: marcador.mar_equi_1,
            mar_equi_2: marcador.mar_equi_2,
            equi_id_1: marcador.equi_id_1,
            equi_id_2: marcador.equi_id_2,
            mar_dep_id: marcador.mar_dep_id,
            mar_dep_id: marcador.mar_dep_id
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
      e.persist();           /// y por eso debemos especificar persistencia
      await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
        form:{
          ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
          [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
        }
      });
      console.log(this.state.form);  /// probar por consola lo que se guarda
    }
  
    //se ejecuta cuando lo realiza
    componentDidMount(){
      this.setState({deporte: cookies.get('deporte_menu')});
      this.peticionGet();
      
    }
  
    render(){  
  
      const form = this.state.form
  
      return (
        <div className="App content_tabla" >
          <br /><br /><br />
          <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}} >{`Agregar Juego de ${this.state.deporte}`}</button>
          <br /><br />
          <table className="table tabla">
          <thead>
            <tr>
              <th>Equipo 1</th>
              <th>Marcador 1</th>
              <th>Equipo 2</th>
              <th>Marcador 2</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(marcador => {
              return(
                <tr key={marcador.mar_id}>
                  <td>{marcador.equi_id_1}</td> 
                  <td>{marcador.mar_equi_1}</td> 
                  <td>{marcador.equi_id_2}</td> 
                  <td>{marcador.mar_equi_2}</td>
                  <td>{marcador.mar_fecha_event}</td>
                  <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarUsuario(marcador); this.modalInsertar()}}/></button>
                      {" "}
                      <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarUsuario(marcador); this.modalEliminar()}}/></button>
                  </td> 
                </tr>
              )
            })}
          </tbody>
          </table>
  
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
                <input className="form-control" type="date" name="mar_hora_event" id="mar_hora_event" onChange={this.handleChange} value = {form ? form.mar_hora_event : ''}></input>
                <br />
                <label htmlFor="mar_hora_registro">mar_hora_registro</label>
                <input className="form-control" type="time" name="mar_hora_registro" id="mar_hora_registro" onChange={this.handleChange} value = {form ? form.mar_hora_registro : ''}></input>
                <br />
                <label htmlFor="mar_fecha_registro">mar_fecha_registro</label>
                <input className="form-control" type="time" name="mar_fecha_registro" id="mar_fecha_registro" onChange={this.handleChange} value = {form ? form.mar_fecha_registro : ''}></input>
                <br />
                <label htmlFor="mar_dep_id">mar_dep_id</label>
                <input className="form-control" type="text" name="mar_dep_id" id="mar_dep_id" onChange={this.handleChange} value = {form ? form.mar_dep_id : ''}></input>
                <br />
                <label htmlFor="mar_usu_id">mar_usu_id</label>
                <input className="form-control" type="text" name="mar_usu_id" id="mar_usu_id" onChange={this.handleChange} value = {form ? form.mar_usu_id : ''}></input>
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

export default PageTabla;