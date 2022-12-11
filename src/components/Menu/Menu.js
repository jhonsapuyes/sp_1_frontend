import { Component } from "react";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import './Menu.css';
//Imports - Menu

const url_deportes= "http://localhost:9000/api/deportes";
//URL BD Deportes - para el Menu 

class Menu extends Component{
  
  //Estados React para los cambios del Menu
  constructor(props) {
    super(props);
    this.state = {
      menu: "desactive_menu_items",
      icon: "desactive_menu_icon",
      data:[],
      data_deporte:[],//Donde se guardan los datos BD Deportes
    };
    this.menuActive = this.menuActive.bind(this); 
  }


  // Funciones Para el Responsive del Menu
  menuActive() {
    var menuState = (this.state.menu === "desactive_menu_items") ? "active_menu_items" : "desactive_menu_items";
    var iconState = (this.state.icon === "desactive_menu_icon") ? "active_menu_icon" : "desactive_menu_icon";
    this.setState({
       menu: menuState,
       icon: iconState
    });
  }

  // Funciones Para traer la informacion de la BD Deportes
  peticion_get_deportes= ()=>{
    axios.get(url_deportes).then(response=>{
      this.setState({data_deporte:response.data})
    })
    .catch(error => {
      console.log(error.message)
    }
    )
  }

  // Funciones Para Inicializar cuando el Dom este listo
  componentDidMount(){
    this.peticion_get_deportes()
  }

  render(){
    return(
        <nav className="menu_top">
          <div className="menu_img">
          </div>
          <ul className={`menu_items ${this.state.menu}`}>
            <li className="menu_item">
              <Link to='/'>INICIO</Link>
            </li>
            <li className="menu_item">
              <p> DEPORTES <span className="arrow_menu"> <FontAwesomeIcon icon={faAngleDown}/> </span></p>
              <ul className="submenu_top" >
                  {this.state.data_deporte.map((evento) =>{ 
                    return (
                      <li key={evento.dep_id}> <Link to='/PageDeporte'>{evento.dep_nombre}</Link> </li>
                    )
                  })}
              </ul>
            </li>
          </ul>
          <ul className={`menu_items ${this.state.menu}`}>
            <li className="menu_item">
              <Link to='/PageSesion'>Iniciar sesión</Link>
            </li>
            <li className="menu_item item_borde">
              <Link to='/PageSesion'>Inscribirse</Link>
            </li>
          </ul>
          <div className={`icon_menu_top ${this.state.icon}`} onClick={this.menuActive}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
        )
  }

}

export default Menu;