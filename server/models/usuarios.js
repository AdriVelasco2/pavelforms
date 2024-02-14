// models/parejas.js

const { Schema, model, mongoose } = require("mongoose");

// Define el esquema del modelo pareja
const usuariosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    // Puedes agregar validaciones adicionales para el formato del correo electrónico
    // validate: {
    //   validator: (value) => {
    //     // Validación personalizada para el formato del correo electrónico
    //   },
    //   message: 'Formato de correo electrónico no válido',
    // },
  },
});

// Crea el modelo pareja
const usuario = mongoose.model("usuarios", usuariosSchema);

module.exports = usuario;
