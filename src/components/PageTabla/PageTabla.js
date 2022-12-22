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
const url_equipo= "http://localhost:9000/api/equipos";

class PageTabla extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          data_equipos: [],
          data_allMarcadores: [],
          modalInsertar: false,
          modalEliminar: false,
          tipoModal:'',
          deporte: "",
          today: new Date(),
          equipo1: "",
          equipo2: "",
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


    peticionGet = () => {
      axios.get(url+ "/-1/" + cookies.get('deporte_menu_id') + "/99999").then(response => {
        //console.log(response.data);
        this.setState({data:response.data})
      }).catch(error => {
        console.log(error.message);
      })
    }

    peticionGetAllMarcadores = () => {
      axios.get(url).then(response => {
        //console.log(response.data);
        this.setState({data_allMarcadores:response.data})
      }).catch(error => {
        console.log(error.message);
      })
    }

    peticionGetEquipos = () => {
      axios.get(url_equipo).then(response => {
        this.setState({data_equipos:response.data})
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
      window.location.href='./PageTabla';
    }
  
    peticionPut = () => {
      axios.put(url+"/"+this.state.form.mar_id,this.state.form).then(response => {
        this.modalInsertar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message);
      })
    }
  
    peticionDelete = () => {
      axios.delete(url+"/"+this.state.form.mar_id).then(response => {
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
            mar_hora_event:marcador.mar_hora_event,
            mar_equi_1: marcador.mar_equi_1,
            mar_equi_2: marcador.mar_equi_2,
            equi_id_1: marcador.equi_id_1,
            equi_id_2: marcador.equi_id_2,
            mar_dep_id: marcador.mar_dep_id,
            equi_img_1: marcador.equi_img_1,
            equi_img_2: marcador.equi_img_2,
        }
      })
    }
  
    cambiarImgEquipo = (equipo) =>{
      this.setState({equipo2: equipo})
      console.log(this.state.equipo2);
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
          [e.target.name]: e.target.value,  /// los nombres de los imputs deben ser iguales a los del arreglo
          mar_fecha_registro: this.state.today.toISOString(),
          mar_hora_registro: this.state.today.toLocaleTimeString('en-US'),
          mar_dep_id: cookies.get('deporte_menu_id')*1,
          mar_usu_id: cookies.get('usu_id')*1,
        }
      });
      console.log(this.state.form);  /// probar por consola lo que se guarda
    }
  
    //se ejecuta cuando lo realiza
    componentDidMount(){
      this.setState({deporte: cookies.get('deporte_menu')});
      this.peticionGet();
      this.peticionGetEquipos();
      this.peticionGetAllMarcadores();
    }
  
    handleChangeNum = async e=>{  /// función para capturar los datos del usuario. Es en 2do plano debe ser asincrona
      e.persist();
      
      await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
        form:{
          ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
          [e.target.name]: parseInt(e.target.value),  /// los nombres de los imputs deben ser iguales a los del arreglo
        }
      });
      console.log(this.state.form);  /// probar por consola lo que se guarda
    }

    render(){  
  
      const form = this.state.form
  
      return (
        <div className="App content_tabla" >
          <br /><br /><br />
          {cookies.get('usu_nombre')?
                  <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar', form:{mar_id: this.state.data_allMarcadores.length+1000}}); this.modalInsertar()}} >{`Agregar Juego de ${this.state.deporte}`}</button>
                  :
                  <></>
          }
          <br /><br />
          <table className="table tabla">
          <thead>
            <tr>
              <th>Equipo 1</th>
              <th>Marcador 1</th>
              <th>Equipo 2</th>
              <th>Marcador 2</th>
              <th>Fecha</th>
              <th>Hora</th>
              {cookies.get('usu_nombre')?
                <th>Acciones</th>
                :
                <></>
              }
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(marcador => {
              return(
                <tr key={marcador.mar_id}>
                  <td><img alt={marcador.equi_id_1} title={marcador.equi_id_1} src={(marcador.equi_img_1)?marcador.equi_img_1:"./assets/Logo_default.png"} width="30px"/> {marcador.equi_id_1}</td> 
                  <td>{marcador.mar_equi_1}</td> 
                  <td><img src={(marcador.equi_img_2)? marcador.equi_img_2:"./assets/Logo_default.png"} width="30px"/> {marcador.equi_id_2}</td> 
                  <td>{marcador.mar_equi_2}</td>
                  <td>{(marcador.mar_fecha_event).substr(0, 10)}</td>
                  <td>{(marcador.mar_hora_event).substr(0, 5)}</td>
                  {cookies.get('usu_nombre')?
                  <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarUsuario(marcador); this.modalInsertar()}}/></button>
                    {" "}
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarUsuario(marcador); this.modalEliminar()}}/></button>
                  </td> 
                  :
                  <></>
                }
                  
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
                
                <label htmlFor="equi_id_1">Equipo 1</label>
                <select class="form-select" aria-label="Default select" name="equi_id_1" id="equi_id_1"  onChange={this.handleChangeNum}>
                  <option> </option>
                  {this.state.data_equipos.map((equipo) =>{ 
                    return (
                      <option key={equipo.equi_id}  value={(equipo.equi_id)}>{equipo.equi_nombre}</option>
                    )
                  })}
                </select>
                <br/>
                <label htmlFor="equi_id_2">Equipo 2</label>
                <select class="form-select" aria-label="Default select" name="equi_id_2" id="equi_id_2"  onChange={this.handleChangeNum}>
                  <option selected> </option>
                  {this.state.data_equipos.map((equipo) =>{ 
                    return (
                      <option key={equipo.equi_id}  value={(equipo.equi_id)}>{equipo.equi_nombre}</option>
                    )
                  })}
                </select>
                <br/>
                {/* <label htmlFor="equi_id_1">Equipo 1</label>
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
                */}
                <label htmlFor="mar_equi_1">mar_equi_1</label>
                <input className="form-control" type="number" name="mar_equi_1" id="mar_equi_1" onChange={this.handleChangeNum} value = {form ? form.mar_equi_1 : ''}></input>
                <br />
                <label htmlFor="mar_equi_2">mar_equi_1</label>
                <input className="form-control" type="number" name="mar_equi_2" id="mar_equi_2" onChange={this.handleChangeNum} value = {form ? form.mar_equi_2 : ''}></input>
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