import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import "./PageUsuarios.css";

const field_id = '/usu_id/'
const url= "http://localhost:9000/api/usuarios";

class PageUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          modalInsertar: false,
          modalEliminar: false,
          tipoModal:'',
          form:{
            usu_id:'',
            usu_email:'',
            usu_clave:'',
            usu_nombre:'',
            usu_access:'',
          }
        };
    }

    peticionGet = () => {
      axios.get(url).then(response => {
        //console.log(response.data);
        this.setState({data:response.data})
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionPost = async () => {
      await axios.post(url, this.state.form).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionPut = () => {
      axios.put(url+"/"+this.state.form.usu_id,this.state.form).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionDelete = () => {
      axios.delete(url+"/"+this.state.form.usu_id).then(response => {
        this.modalEliminar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
  
    seleccionarUsuario=(usuario)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          usu_id: usuario.usu_id,
          usu_email: usuario.usu_email,
          usu_clave: usuario.usu_clave,
          usu_nombre: usuario.usu_nombre,
          usu_access: usuario.usu_access
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
      this.peticionGet();
    }
  
    render(){  
  
      const form = this.state.form
  
      return (
        <div className="App content_tabla" >
          <br /><br /><br />
          <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar', form:{usu_id: this.state.data.length+1000}}); this.modalInsertar()}} >Agregar Usuario</button>
          <br /><br />
          <table className="table tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Clave</th>
              <th>Nombre</th>
              <th>Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(usuario => {
              return(
                <tr key={usuario.usu_id}>
                  <td>{usuario.usu_id}</td> 
                  <td>{usuario.usu_email}</td> 
                  <td>{usuario.usu_clave}</td> 
                  <td>{usuario.usu_nombre}</td> 
                  <td>{usuario.usu_access}</td> 
                  <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}/></button>
                      {" "}
                      <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarUsuario(usuario); this.modalEliminar()}}/></button>
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
                <label htmlFor="usu_id">ID</label>
                <input className="form-control" type="text" name="usu_id" id="usu_id" readOnly onChange={this.handleChange} value = {form ? form.usu_id : this.state.data.length+1}></input>
                <br />
                <label htmlFor="usu_email">Email</label>
                <input className="form-control" type="text" name="usu_email" id="usu_email" onChange={this.handleChange} value = {form ? form.usu_email : ''}></input>
                <br />
                <label htmlFor="usu_clave">Clave</label>
                <input className="form-control" type="text" name="usu_clave" id="usu_clave" onChange={this.handleChange} value = {form ? form.usu_clave : ''}></input>
                <br />
                <label htmlFor="usu_nombre">Nombres</label>
                <input className="form-control" type="text" name="usu_nombre" id="usu_nombre" onChange={this.handleChange} value = {form ? form.usu_nombre : ''}></input>
                <br />
                <label htmlFor="usu_access">Acesso</label>
                <select class="form-select" aria-label="Default select" name="usu_access" id="usu_access"  onChange={this.handleChange}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
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

export default PageUsuarios;