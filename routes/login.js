



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
        const {nombre,password}= req.body
       
        const sql_post=`SELECT * from usuarios WHERE NOMBRE="${nombre}" AND PASSWORD="${password}"`
        querys.conn.query(sql_post, error => {
            if(error){
                throw error;
            }
            else{
                res.send("existe")
            }
        })
    }
    else{
        res.send("wrong request")
    }
})

module.exports= route;
