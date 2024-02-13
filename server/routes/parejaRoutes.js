const express = require('express');
const Pareja = require('../schema/pareja.js');
const router= express.Router();

const app = express();

// Configurar middleware para manejar datos de formulario
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos


// Definir una ruta para manejar la solicitud del formulario
router.post('/agregar-pareja', (req, res) => {
    // Crear una nueva instancia del modelo de usuario con los datos del formulario
    const newPareja = new Pareja({
        name: req.body.name,
        email: req.body.email
        });

    // Guardar el nuevo usuario en la base de datos
    newPareja.save()
        .then(() => {
            console.log('Usuario creado exitosamente');
            res.send('Usuario creado exitosamente');
        })
        .catch((error) => {
            console.error('Error al crear usuario:', error);
            res.status(500).send('Error al crear usuario');
        });
});
module.exports=router