const express = require("express");
const usuariosSchema = require("../models/usuarios.js");
const router = express.Router();


// Configurar middleware para manejar datos de formulario

// Conectar a la base de datos

// Definir una ruta para manejar la solicitud del formulario
router.post('/agregar-usuario', async (req, res) => {
  try {
    const usuario = new usuariosSchema(req.body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.json({ message: error.message });
  }
});
module.exports = router;
