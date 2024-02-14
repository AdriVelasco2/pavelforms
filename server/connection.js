const mongoose  = require("mongoose");
require("dotenv").config()

// Conexión a la url
const uri = process.env.MONGODB_URI
const db= mongoose.connection

mongoose
.connect(uri)
.then(()=>{
    console.log("Connectado a MONGODB");
})
.catch(err =>console.log(err))

db.once('open',_=>{
    console.log('Database is conected to', uri);
})