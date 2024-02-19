<template>
    <div>
      <h2>Looogin </h2>
      <form @submit.prevent="forgot">
  
        <label for="email">email:</label>
        <input type="text" id="email" v-model="email" required /><br />
      
        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  </template>
  
  <script>
  import http from "../../services/HttpService";
  
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      async forgot() {
        try {
          const response = await http.post('/api/auth/forgotPassword', {
            email: this.email
          });
          
          // Manejar la respuesta del servidor
          console.log(response.data);
  
          // Redireccionar al usuario a la página de inicio, por ejemplo:
           this.$router.push('/login');
        } catch (error) {
          console.error('Error de envío de código:', error);
        }
      }
    }
  
  
  }
  </script>
  
  <style>
  body{
      height: fullscreen;
  }
  html{
      height: fullscreen;
      background-color: white;
  }
  </style>