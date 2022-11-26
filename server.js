

const expres= require('express')
const app= expres()

const puerto= 9000
app.set('port', puerto)

app.use(expres.urlencoded({extended:false}))
app.use(expres.json())


app.use(expres.static(__dirname + '/public'))


//app.use('/api/tododeportes',require('./routes/index'));
app.use('/api/register', require('./routes/registers'));
app.use('/api/login', require('./routes/login'));
app.use('/api/usuario', require('./routes/process_user'));
app.use('/api/otra_api', require('./routes/otra'));



// hace lo mismo que la funcion de arriba //
//app.get('/',(req,res)=>{
//    res.json({"items":"get"})
//})

app.listen(app.get('port'),()=>{
console.log(`server running to port ${app.get('port')}`)
}
)





