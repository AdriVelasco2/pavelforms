<template>
  <div class="grid grid-cols-2 bg-slate-200">
    <div class="flex  h-screen">
      <img src="https://picsum.photos/id/439/500" class=" " alt="Imagen">
    </div>
    <div class="grid content-center">
      <div class="flex flex-col items-center">
        <h1 class="text-3xl mb-4">Login</h1>
        <h1 class="text-sm mb-4">Introduce tus credenciales</h1>
        <form class="w-full max-w-md" @submit.prevent="logIn">
          <div class="mb-4">
            <label for="user" class="block text-gray-700">Usuario:</label>
            <input type="text" class="form-input mt-1 block w-full" id="user" v-model="user" placeholder="Ingrese valor"
              required /><br />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700">Contraseña:</label>
            <input type="password" id="password" class="form-input mt-1 block w-full" placeholder="Ingrese valor"
              v-model="password" required /><br />
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Enviar
            </button>
            <router-link to="/registro"
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
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
import { useAuthStore } from "@/store/authStore";
export default {
  data() {
    return {
      user: '',
      password: ''
    };
  },
  methods: {
    async logIn() {
      try {
        const response = await http.post('/api/auth/logIn', {
          user: this.user, // Renombramos 'username' a 'user' para que coincida con el nombre esperado en el servidor
          password: this.password
        });
        const authStore = useAuthStore();
        // Manejar la respuesta del servidor
        console.log(response.data);
        // sessionStorage.setItem('token', response.data.token);
        const token = response.data.token;
        authStore.setToken(token);
        // Redireccionar al usuario a la página de inicio, por ejemplo:
        this.$router.push('/home');
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
      }
    }
  }


}
</script>

<style>
body {
  height: fullscreen;
}

html {
  height: fullscreen;
  background-color: white;
}</style>