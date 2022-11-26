


const mysql= require('mysql')    

let conexion= mysql.createConnection({
    host: 'localhost',
    database: 'universidad',
    user: 'root',
    password: 'anderson777'
})
conexion.connect((error)=>{
    if(error){
        throw error
    }
    else{
        console.log('CONEXION EXITOSA')
    }
})

//let get=conexion.query('SELECT * from usuarios', function (error,results,fields) {
//    if(error){
//        throw error;
//    }
//    else{
//        results.forEach(result=>{
//            console.log(result)
//        })
//    }
//})
//conexion.end()

exports.conn= conexion;


