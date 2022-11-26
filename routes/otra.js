 

const {Router}= require('express');
const route= Router();

// nota para usar sin problemas node-fetch instalalo asi: npm install node-fetch@2 //
const fetch= require('node-fetch');

route.get('/',  async (req,res)=>{
    const response= await fetch("https://jsonplaceholder.typicode.com/users")
    const datos_json= await response.json();
    res.send(datos_json)
})

module.exports= route;



