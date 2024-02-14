require('./connection')
const express= require('express')
require("dotenv").config()
const app = express();
const port=process.env.PORT || 3000
const userRoutes = require('./routes/usuarioRoutes.js')
const cors = require('cors')
// Definimos puerto
app.listen(port, ()=> console.log(`servidor funcionando en: http://localhost:${port}` ));
app.use(cors({ origin: 'http://localhost:4000' }));
app.use(express.json())
app.use('/api',userRoutes)
app.get("/",(req,res)=>{
    res.send("Benvinguts")
})