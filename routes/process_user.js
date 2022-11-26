

const {Router}= require('express')
const { each } = require('underscore')
const route= Router()
const _= require('underscore')

const usuarios= require('../datos/sample.json')

const querys= require('./sql/process_sql')

route.get('/',(req,res)=>{
    const sql_get='SELECT * from deportes'
    querys.conn.query(sql_get, (error,results,fields) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.json([{"respuesta":"not results"}])
        }
    })
        //res.json(usuarios)
})
route.post('/',(req,res)=>{
    const {nombre,password}= req.body
    if(nombre&&password){
        const {deporte}= req.body.deporte

        const sql_post='INSERT INTO deportes SET ?'
        querys.conn.query(sql_post, deporte, error => {
            if(error){
                throw error;
            }
            else{
                res.send("guardado")
            }
        })

        //const id=usuarios.length +1
        //const new_user={...req.body,id}
        //usuarios.push(new_user)
        //res.send(usuarios)
    }
    else{
        res.send("wrong request")
    }
})
route.put('/:id',(req,res)=>{
    const {id}= req.params
    const {nombre, password}= req.body

    const sql_put= `UPDATE usuarios SET  NOMBRE= '${nombre}', PASSWORD= '${password}' WHERE ID= ${id}`
    querys.conn.query(sql_put, error => {
        if(error){
            throw error;
        }
        else{
            res.send("actualizado")
        }
    })


    //const {id}= req.params;
    //const {nombre,password}= req.body
    //if(nombre&&password){
    //    _,each(usuarios,(usuario, i)=>{
    //        if(usuario.id == id){
    //            usuario.nombre= nombre,
    //            usuario.password= password
    //        }
    //    })
    //    res.json(usuarios)
    //}
    //else{
    //    res.status(500).json({error:"there was an error"})
    //}
})
route.delete('/:id',(req,res)=>{
    const {id}= req.params

    const sql_put= `DELETE FROM usuarios WHERE ID= ${id}`
    querys.conn.query(sql_put, error => {
        if(error){
            throw error;
        }
        else{
            res.send("borrado")
        }
    })


    //const {id}= req.params;
    //_,each(usuarios,(usuario, i)=>{
    //    if(usuario.id == id){
    //        usuarios.splice(i,1)
    //    }
    //})
    //res.json(usuarios)
})

module.exports= route;




