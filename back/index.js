const {app} = require('./app')
const { PORT } =require("./config.js");
const { MONGODB_URI } = require("./config.js");
// import "./libs/initialSetup.js";
const mongoose = require("mongoose")
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Conectado a la bbdd"))
    .catch((error) => console.log(error))
    
app.listen(PORT);
console.log("Server on port", app.get("port"));
