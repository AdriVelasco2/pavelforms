const express = require('express');
const parejaRoutes = require('./routes/parejaRoutes.js');
const mongoose = require('mongoose');
// Crear la aplicación Express
const app = express();




// Conectar a la base de datos
const { mongoURI } = require('./config/config.js');

// Conexión a la base de datos MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a la base de datos establecida');
        // Aquí puedes configurar el resto de tu aplicación, como definir rutas, iniciar el servidor, etc.
    })
    .catch((error) => {
        console.error('Error de conexión a la base de datos:', error);
    })
// Definir las rutas de usuario

// Middleware para parsear JSON
app.use(express.json());

// Montar las rutas de usuario
app.use('/parejas', parejaRoutes);

// Configuración de otras rutas y middlewares...

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
