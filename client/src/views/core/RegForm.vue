<template>
  <div>
    <h2>Agregar Usuario</h2>
    <form @submit.prevent="agregarUsuario">
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="name" required /><br />
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required /><br />
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required /><br />
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required /><br />
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required /><br />
      <button type="submit">Agregar Usuario</button>
    </form>
  </div>
</template>

<script>
import http from "../../services/HttpService";
import bcrypt from 'bcryptjs';

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
    async agregarUsuario() {
      try {
        const hashedPassword = await bcrypt.hash(this.usuario.password, 10); // 10 es el costo del algoritmo
        const userData = {
          name: this.name,
          username: this.username,
          email: this.email,
          password: hashedPassword,
        };

        const response = await http.post(
          "/api/auth/createAccount",
          JSON.stringify(userData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Usuario agregado correctamente", response.data);
        // Realizar acciones con la respuesta recibida
        console.log(response.status); // Aquí obtienes el código de estado HTTP

        if (response.status === 201) {
          console.log("La solicitud fue exitosa");
          console.log(response.data); // Aquí obtienes los datos de la respuesta
          // Realizar acciones con la respuesta recibida
        } else {
          console.error(
            "La solicitud falló con el código de estado:",
            response.status
          );
          // Manejar el error de acuerdo a tu lógica
        }
      } catch (error) {
        console.error("Error al enviar datos:", error);
      }
    },
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
