import React, { Component } from "react";
import Cookies from 'universal-cookie'
import { Link } from "react-router-dom";
const cookies = new Cookies();

class PageDeporte extends Component {


    constructor(props) {
        super(props);
        this.state = {
          deporte: "fútbol",
        };
    }

    componentDidMount(){
        this.setState({deporte: cookies.get('deporte_menu')})
    }

    render(){
        return(
            <>
                <main className="content_tabla">
                    <h1>{`Pagina de Deportes ${this.state.deporte}`}</h1>
                    <Link to='/PageTabla'>Ver Tablas</Link>
                </main>
            </>
            
        )
    }
}

export default PageDeporte;
