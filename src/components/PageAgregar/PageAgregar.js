import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import "./PageAgregar.css";
import Cookies from 'universal-cookie';


const url= "http://localhost:9000/api/"


const cookies = new Cookies();

class PageAgregar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          dataDeportes: [],
          modalInsertar: false,
          modalEliminar: false,
          tipoModal:'',
          ventana: 'deportes',
          field_id: 'dep_id/',
          form:{
            dep_id: '',
            dep_nombre: "",
          }
        };
    }

    peticionGet = () => {
      axios.get(url+cookies.get('agregar_menu')).then(response => {
        this.setState({data:response.data})
      }).catch(error => {
        console.log(error.message);
      })
    }
    peticionGetDeportes = () => {
      axios.get(url+"deportes").then(response => {
        this.setState({dataDeportes:response.data})
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionPost = async () => {
      await axios.post(url+cookies.get('agregar_menu'), this.state.form).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
      window.location.href='./PageAgregar';
    }
  
    peticionPut = () => {
      (cookies.get('agregar_menu') === "deportes")?
      axios.put(url+this.state.ventana+"/"+this.state.form.dep_id,this.state.form).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
      :
      axios.put(url+this.state.ventana+"/"+this.state.form.equi_id,this.state.form).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
      window.location.href='./PageAgregar';
    }
  
    peticionDelete = () => {
      (cookies.get('agregar_menu') === "deportes")?
      axios.delete(url+this.state.ventana+"/"+this.state.form.dep_id).then(response => {
        this.modalEliminar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
      :
      axios.delete(url+this.state.ventana+"/"+this.state.form.equi_id).then(response => {
        this.modalEliminar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
      window.location.href='./PageAgregar';
    }
  
  
    seleccionarUsuario=(equipo)=>{
      (cookies.get('agregar_menu') === "deportes")? 
      this.setState({
        tipoModal: 'actualizar',
        form: {
          dep_id: equipo.dep_id,
          dep_nombre: equipo.dep_nombre,
        }
      })
      :
      this.setState({
        tipoModal: 'actualizar',
        form: {
          equi_id: equipo.equi_id,
          equi_nombre: equipo.equi_nombre,
          equi_img: equipo.equi_img,
          dep_id: equipo.dep_id,
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
       /// y por eso debemos especificar persistencia
      await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
        form:{
          ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
          [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
        }
      })
      console.log(this.state.form);  /// probar por consola lo que se guarda
    }
  
    detectarAgregar(agregar){
      this.setState({ventana: agregar});
      if(agregar === "deportes"){
        this.setState({field_id: "dep_id/"});
        this.setState({form:{
          dep_id: '',
          dep_nombre: "",
        }})
      }else{
        this.setState({field_id: "equi_id/"});
        this.setState({form:{
          equi_id: '',
          equi_nombre: "",
          equi_img: "",
          dep_id: "",
        }})
      }
    }

    //se ejecuta cuando lo realiza
    componentDidMount(){
      this.detectarAgregar(cookies.get('agregar_menu'));
      this.peticionGet();
      this.peticionGetDeportes();
    }
  
    render(){  
  
      const form = this.state.form
  
      return (
        <div className="App content_tabla" >
          <br /><br /><br />
          {(this.state.ventana === 'equipos') ?
            <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar', form:{equi_id: this.state.data.length+10 }}); this.modalInsertar()}} >{`Agregar Juego de ${this.state.ventana}`}</button>
            :
            <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar', form:{dep_id: this.state.data.length+1 }}); this.modalInsertar()}} >{`Agregar Juego de ${this.state.ventana}`}</button>
          }
          <br /><br />
          <table className="table tabla">
          <thead>
            {(this.state.ventana === 'equipos') ?
            <tr>
              <th>Equipo id</th>
              <th>Logo</th>
              <th>Equipo</th>
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
                  <td><img className="tabla_img" src={(equipo.equi_img)?equipo.equi_img:"./assets/Logo_default.png"}/></td>
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
                  <tr key={deporte.equipo}>
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
              <label htmlFor="equi_nombre">nombre</label>
              <input className="form-control" type="text" name="equi_nombre" id="equi_nombre" onChange={this.handleChange} value = {form ? form.equi_nombre : ''}></input>
              <br />
              <label htmlFor="equi_img">Logo</label>
              <input className="form-control" type="text" name="equi_img" id="equi_img" onChange={this.handleChange} value = {form ? form.equi_img : ''}></input>
              <br />
              <label htmlFor="dep_id">Deporte</label>
                <select class="form-select" aria-label="Default select" name="dep_id" id="dep_id"  onChange={this.handleChange}>
                  <option> </option>
                  {this.state.dataDeportes.map((deporte) =>{ 
                    return (
                      <option key={deporte.dep_id}  value={deporte.dep_id}>{deporte.dep_nombre}</option>
                    )
                  })}
                </select>
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
