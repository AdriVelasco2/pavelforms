const mongoose = require('mongoose');

// Definir el esquema del usuario
const parejaSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Crear el modelo de usuario
const Pareja = mongoose.model('Pareja', parejaSchema);

// Exportar el modelo para poder usarlo en otras partes de la aplicación si es necesario
module.exports = Pareja;