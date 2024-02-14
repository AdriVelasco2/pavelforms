<template>
  <div>
    <h2>Agregar Usuario</h2>
    <form @submit.prevent="agregarUsuario">
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="name" required><br>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required><br>
      <button type="submit">Agregar Usuario</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import http from '../../services/HttpService'

export default {
  data() {
    return {
      usuario: {
        name: '',
        email: ''
            }
    };
  },
  methods: {
    async agregarUsuario() {
      try {
        const userData = {
          name: this.name,
          email: this.email,

        };

        const response = await http.post('/api/agregar-usuario', JSON.stringify(userData),{
        headers: {
            'Content-Type': 'application/json'
          }
      });
        console.log("Usuario agregado correctamente",response.data);
        // Realizar acciones con la respuesta recibida
        console.log(response.status); // Aquí obtienes el código de estado HTTP

if (response.status === 200) {
  console.log('La solicitud fue exitosa');
  console.log(response.data); // Aquí obtienes los datos de la respuesta
  // Realizar acciones con la respuesta recibida
} else {
  console.error('La solicitud falló con el código de estado:', response.status);
  // Manejar el error de acuerdo a tu lógica
}
} catch (error) {
console.error('Error al enviar datos:', error);
}}
    }
  };
</script>

<style>
body {
  height: fullscreen;
}
html {
  height: fullscreen;
  background-color: white;
}
</style>
