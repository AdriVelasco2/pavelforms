<template>
  <div class="flex justify-center items-center h-screen bg-gray-300" v-if="changes === false">
       <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold mb-4">Introduce código recibido</h1>
        <form class="w-full max-w-md" @submit.prevent="coding">
          <div class="mb-4">
            <label for="code" class="block text-gray-700"
              >Código:</label
            >
            <input
              type="text"
              id="code"
              v-model="code"
              class="form-input mt-1 block w-full"
              placeholder="Introduce el código"
              required
            /><br />
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
   <div class="flex justify-center items-center h-screen bg-gray-300" v-else>
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-4">Introduce código recibido</h1>
        <form class="w-full max-w-md" @submit.prevent="change">
          <div class="mb-4">
            <label for="password" class="block text-gray-700"
              >Introduce una nueva contraseña</label
            >
            <input
              type="password"
              id="password"
              v-model="password" 
              pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,30}$"
              title="Ha de tener un número, una mayúscula y un carácter especial"
              class="form-input mt-1 block w-full"
              placeholder="Introduce el código"
              required
            /><br />
          </div>
          <div class="mb-4">
            <label for="password2" class="block text-gray-700"
              >Repite la contraseña</label
            >
            <input
              type="password"
              id="password2"
              v-model="password2"
              class="form-input mt-1 block w-full"
              placeholder="Introduce el código"
              required
            /><br />
          </div>
          <div class="flex items-center justify-between">
            <button
              @click="validations"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
 </template>

<script>
import http from "../../services/HttpService";
import bcrypt from "bcryptjs";
export default {
  created() {
    const id = this.$route.params.id;
    console.log("Id recibido: ", id);
  },
  data() {
    return {
      changes: false,
      password: "",
      password2: "",

      id: this.$route.params.id,
      code: "",
      igual: false,

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
    async coding() {
      //Mandamos el código
      try {
        
          
        const response = await http.post("/api/auth/code", {
          id: this.id,
          code: this.code,
        });
        this.changes = true;
        // Manejar la respuesta del servidor
        console.log("Código recibido: ", this.code, " Id Recibido: ", this.id);
        console.log(response.data);

        // Redireccionar al usuario a la página de inicio, por ejemplo:
          // this.$router.push('/login');
      

      } catch (error) {
        // console.log("Código recibido: ", this.code, " Id Recibido: ", this.id);
        this.changes = false;
        console.error("Error de envío de código:", error);
      }
    },

    async change() {
      try {
        if(this.igual){
        const response = await http.put(`/api/user/password/${this.id}`, {
          password: this.password,
        });
        this.$router.push("/login");
      }
        console.log(response.data);
      } catch (error) {
        console.error("Error: ", error);
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
