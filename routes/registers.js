

const {Router}= require('express')
const route= Router()
const querys= require('./sql/process_sql')


route.get('/',(req,res)=>{
    const sql_get='SELECT * from usuarios'
    querys.conn.query(sql_get, (error,results,fields) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.send("not results")
        }
    })
        //res.json(usuarios)
})

route.post('/',(req,res)=>{
    const {nombre,password}= req.body
    if(nombre&&password){
        const datos_in={
            nombre: req.body.nombre,
            password: req.body.password
        }
        const sql_post='INSERT INTO usuarios SET ?'
        querys.conn.query(sql_post, datos_in, error => {
            if(error){
                throw error;
            }
            else{
                res.send("guardado")
            }
        })
    }
    else{
        res.send("wrong request")
    }
})

module.exports= route;
