<template>
  <div class="grid grid-cols-2 bg-slate-200">
    <div class="flex  h-screen">
      <img src="https://picsum.photos/id/439/500" class=" " alt="Imagen">
    </div>
    <div class="grid content-center">
      <div class="flex flex-col items-center">

        <h1 class="text-2xl font-bold mb-4">Registrar</h1>


        <form class="w-full max-w-md" @submit.prevent="registerUser">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Nombre:</label>
            <input type="text" id="name" v-model="name" class="form-input mt-1 block w-full" placeholder="Ingrese valor"
              required title="Por favor ingrese su nombre" />
          </div>
          <div class="mb-4">
            <label for="username" class="block text-gray-700">Username:</label>
            <input type="text" id="username" class="form-input mt-1 block w-full" minlength="5" maxlength="21"
              placeholder="Ingrese valor" pattern="^[^0-9][a-zA-Z0-9]*$" v-model="username" required
              title="No puede empezar por un número y al menos 5 caracteres " /><br />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email:</label>
            <input type="email" id="email" class="form-input mt-1 block w-full" v-model="email"
              placeholder="Ingrese valor" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}^" required
              title="ejemplo@ejemplo.com" /><br />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700">Contraseña:</label>
            <input type="password" id="password" class="form-input mt-1 block w-full" v-model="password"
              placeholder="Ingrese valor" pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,30}$"
              title="Ha de tener un número, una mayúscula y un carácter especial" required /><br />
          </div>
          <div class="mb-4">
            <label for="password2" class="block text-gray-700">Repite contraseña:</label>
            <input type="password" id="password2" class="form-input mt-1 block w-full" placeholder="Ingrese valor"
              v-model="password2" required /><br />
          </div>
          <div class="flex justify-end">
            <button type="submit" @click="validations"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
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
        password2: "",
        igual: false,
      },
    };
  },

  methods: {

    validations() {


      if (this.password != this.password2) {
        alert("Las contraseñas no coinciden")
        return this.igual = false;
      } else {
        return this.igual = true;
      }
    },
    async registerUser() {
      const userData = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      const send = this.igual;
      const authStore = useAuthStore();
      const success = await authStore.register(userData);
      if (success && send) {
        // Registro exitoso, redireccionar al usuario a la página de inicio
        this.$router.push('/login');
      } else {
        // Registro fallido, mostrar un mensaje de error al usuario
        console.log('Error al registrar usuario. Por favor, inténtelo de nuevo.');
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
