<template>
  <div>
    <h2>Looogin </h2>
    <form @submit.prevent="logIn">

      <label for="user">Usuario:</label>
      <input type="text" id="user" v-model="user" required /><br />
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required /><br />
      <button type="submit">Agregar Usuario</button>
    </form>
  </div>
</template>

<script>
import http from "../../services/HttpService";

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
        
        // Manejar la respuesta del servidor
        console.log(response.data);

        // Redireccionar al usuario a la página de inicio, por ejemplo:
        // this.$router.push('/home');
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
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