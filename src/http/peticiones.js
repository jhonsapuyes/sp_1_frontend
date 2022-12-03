

import axios from "axios"

const url= "http://localhost:9000/api/usuarios"
const field_id= 'ID'


const peticion_get= ()=>{
    axios.get(url).then(response=>{
      console.log(typeof(response.data))
      //this.setState({data:response.data}) //pone la data del response en array
      //this.datos_response()

      return response.data;
    })
    .catch(error => {
      console.log(error.message)
    }
    )
}
const respuesta_get=peticion_get()
console.log(respuesta_get)

const peticion_post= async () =>{
    if(this.state.form){
      if(this.state.form.nombre != undefined){
        if(this.state.form.password != undefined){
          delete this.state.form.id

          await axios.post(url, this.state.form).then((response) =>{
            this.modal_insertar()
            this.peticion_get()
          })
          .catch(error => {
            console.log(error.message)
          }
          )
          console.log(this.state.form.password)
        }
        else{
          this.setState({form:''})
          alert("PASSWORD OBLIGATORIO")
        }
      }
      else{
        this.setState({form:''})
        alert("NOMBRE OBLIGATORIO")
      }
      }
      else{alert("RELLENA LOS CAMPOS")}
  }

  const peticion_put= async () =>{
    if(this.state.form.id != '' && this.state.form.nombre != ''  && this.state.form.password != ''){
      await axios.put(url+'/'+field_id+'/'+this.state.form.id, this.state.form)
      .then((response) =>{
        this.modal_insertar()
        this.peticion_get()
      })
      .catch(error => {
        console.log(error.message)
      }
      )
    }
    else{console.log(2)}
  }

  const peticion_delete= async () =>{
    await axios.delete(url+'/'+field_id+'/'+this.state.form.id, this.state.form)
    .then((response) =>{
      this.modal_eliminar()
      this.peticion_get()
    })
    .catch(error => {
      console.log(error.message)
    }
    )
  }


  export default peticion_get;