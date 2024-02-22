<template>
  <div class="grid grid-cols-2 bg-slate-200">
    <div class="flex  h-screen">
      <img src="https://picsum.photos/id/439/500" class=" " alt="Imagen">
    </div>
    <div class="grid content-center">
      <div class="flex flex-col items-center">
        <h1 class="text-3xl mb-4">Recupera tu contraseña</h1>
        <h1 class="text-sm mb-4">Introduce tu correo</h1>
        <form class="w-full max-w-md" @submit.prevent="forgot">
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email:</label>
            <input type="email" class="form-input mt-1 block w-full" id="email" v-model="email" placeholder="Ingrese valor"
              required /><br />
          </div>
         

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Enviar
          </button>
          
            <router-link to="/registro"
            class="inline-block align-baseline font-bold text-sm text-red-500 hover:text-blue-800">
            Registrarme
          </router-link>
          </div>
        </form>
      </div>
    </div>
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