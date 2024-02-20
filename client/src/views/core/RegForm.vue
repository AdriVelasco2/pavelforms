<template>
  <div>
    <h2>Agregar Usuario</h2>
    <form @submit.prevent="registerUser">
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="name" required /><br />
      <label for="username">Username:</label>
      <input type="text" id="username" minlength="5" maxlength="21" pattern="^[^0-9][a-zA-Z0-9]*$" v-model="username" required /><br />
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required /><br />
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required /><br />
   
      <button type="submit">Agregar Usuario</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/authStore';

export default {
  data() {
    return {
      usuario: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      const userData = {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
        };
      const authStore = useAuthStore();
      const success = await authStore.register(userData);
      if (success) {
        // Registro exitoso, redireccionar al usuario a la página de inicio
        this.$router.push('/login');
      } else {
        // Registro fallido, mostrar un mensaje de error al usuario
        alert('Error al registrar usuario. Por favor, inténtelo de nuevo.');
      }
    },
    // async agregarUsuario() {
    //   try {
    //     const userData = {
    //       name: this.name,
    //       username: this.username,
    //       email: this.email,
    //       password: this.password,
    //     };

    //     const response = await http.post(
    //       "/api/auth/createAccount",
    //       JSON.stringify(userData),
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     console.log("Usuario agregado correctamente", response.data);
    //     // Realizar acciones con la respuesta recibida
    //     console.log(response.status); // Aquí obtienes el código de estado HTTP

    //     if (response.status === 201) {
    //       console.log("La solicitud fue exitosa");
    //       console.log(response.data); // Aquí obtienes los datos de la respuesta
    //       // Realizar acciones con la respuesta recibida
    //     } else {
    //       console.error(
    //         "La solicitud falló con el código de estado:",
    //         response.status
    //       );
    //       // Manejar el error de acuerdo a tu lógica
    //     }
    //   } catch (error) {
    //     console.error("Error al enviar datos:", error);
    //   }
    // },
  },
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
