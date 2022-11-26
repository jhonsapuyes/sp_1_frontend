import logo from './logo.svg';
import './App.css';

import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import {Fontawesome} from '@fortawesome/react-fontawesome'
import {faedit, faTrasHAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import {Component} from 'react'


const url= "http://localhost:9000/api/usuarios"

class App extends Component {

  state = {data: []}
  
  peticion_get= ()=>{
    axios.get(url).then(response=>{
      console.log(response.data)
    })
  }

  componentDidMount(){
    this.peticion_get()
  }


  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
  };
}

export default App;
