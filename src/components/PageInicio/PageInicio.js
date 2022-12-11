import React, { Component } from "react";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import './PageInicio.css';

class PageInicio extends Component {
    render(){
        return(
            <main>
                <section className="banner">
                    <figure className="banner_content">
                        <div className="banner_img">
                            <img src="./assets/Qatar2022.png" />
                        </div>
                        <figcaption  className="banner_text">
                            <h1>Consulta los últimos resultados Qatar 2022</h1>
                            <button> <Link to='/PageDeporte'>Ver Resultados</Link></button>
                        </figcaption>
                    </figure>
                </section>
            </main>
        )
    }
}

export default PageInicio;