const mongoose = require('mongoose');
const uri = "mongodb+srv://AdriVelasco2:Paquito35.@cluster0.l1srmgv.mongodb.net/?retryWrites=true&w=majority";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Bienvenido a la grieta del invocador!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
connectDB().catch(console.dir);
module.exports = connectDB;
