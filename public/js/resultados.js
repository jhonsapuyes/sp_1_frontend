




function get(ruta) {
    const url= ruta
    const api= new XMLHttpRequest();
    api.open("GET",url);
    api.send();
    api.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
			console.log(this.response)
            let datos_api = JSON.parse(this.response);
            let res = document.getElementById("resultado")
            res.innerHTML = "";
            if (datos_api.items) {
                if (datos_api.items.length == 0) {
                    alert("NO HAY DATOS")
                }
                else{
                    let i=0
                    let tamaño= datos_api.items.length
                    for(let item of datos_api.items){
                        i++;
                        res.innerHTML +=`<li>IDGAMA: ${item.idGama}  | NAME: ${item.name}
                          | DESCRIPTION: ${item.description} </li> 
                          <button onclick="dell_gama('${item.idGama}')" > dell gama</button>`
                        if(i>tamaño){break;}
                    }
                    console.log(this.status)
                }
            }
            else{
                let datos_get = new Array();
                datos_get["items"] = datos_api;
                if (datos_get.items.length == 0) {
                    alert("NO HAY DATOS")
                }
                else{
                    let i=0
                    let tamaño= datos_get.items.length
                    for(let item of datos_get.items){
                        i++;
                        res.innerHTML +=`<li>ID: ${item.ID}  | DEPORTE: ${item.DEPORTE} </li>`
                        if(i>tamaño){break;}
                    }
                    //document.getElementById("staus_http").innerHTML = "STATUS: " + this.status
                }
            }

        }
    }
}

let ruta='http://localhost:9000/api/usuario'
get(ruta)
