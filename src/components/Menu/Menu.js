import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import './Menu.css';

class Menu extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      menu: "menu_items desactive_menu_items"
    };
    this.menuActive = this.menuActive.bind(this);
  }
  menuActive() {
    // Nuestra función escuchadora del evento click
    var css = (this.state.menu === "desactive_menu_items") ? "active_menu_items" : "desactive_menu_items";
    this.setState({
       menu: css
    });
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
              <Link to='/PageDeporte'>DEPORTES <span className="arrow_menu"> <FontAwesomeIcon icon={faAngleDown}/> </span></Link>
              <ul className="submenu_top">
                <li> <Link to='/PageDeporte'>Fútbol</Link> </li>
                <li> <Link to='/PageDeporte'>Tenis</Link></li>
                <li> <Link to='/PageDeporte'>Basquetbol</Link></li>
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
          <div className='icon_menu_top' onClick={this.menuActive}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
        )
  }

}

export default Menu;