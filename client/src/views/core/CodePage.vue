<template>
    <div>
        <h2>Looogin </h2>
        <form @submit.prevent="code">
    
          <label for="code">Introduce el código recibido:</label>
          <input type="text" id="code" v-model="codigo" required /><br />
        
          <button type="submit">Cambiar contraseña</button>
        </form>
      </div>
  </template>
  
  <script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserDataStore } from '@/store/user';
import http from "../../services/HttpService";
  export default {
    setup() {
    const router = useRouter();
    const userDataStore = useUserDataStore();
    const id = router.currentRoute.value.params.userId;
    const code = async () => {
      try {
        // Enviar el ID del usuario al backend
        console.log("ID RECIBIDO:");
        await http.post('/code', { id,code: codigo.value });
        // Manejar la respuesta del backend si es necesario
      } catch (error) {
        console.error(error);
        // Manejar errores
      }
    };

    return {
      codigo,
      code
    };
  }
  };
  </script>