<template>
     
    <div v-if="changes ===false" >
      <h2>Looogin </h2>
      <form @submit.prevent="coding">
  
        <label for="code">Introduce el código recibido:</label>
        <input type="text" id="code" v-model="code" required /><br />
      
        <button type="submit">Dale duro</button>
      </form>
    </div>
<div  v-else>
        <h2>Looogin </h2>
        <form @submit.prevent="change">
    
          <label for="password">Introduce una nueva contraseña</label>
          <input type="text" id="password" v-model="password" required /><br />
          <label for="password2">Repite la contraseña</label>
          <input type="text" id="password2" v-model="password2" required /><br />
          <button type="submit">Cambiar contraseña</button>
        </form>
      </div>
   
  </template>
  
  <script>
  import http from "../../services/HttpService";
  import bcrypt from "bcryptjs";
  export default {
    created(){
        const id = this.$route.params.id;
        console.log("Id recibido: ", id);
    },
    data() {
      return {
        
        changes: false,
        password:'',
        id: this.$route.params.id,
        code: '',
      };
    },
    methods: {
      async coding() { //Mandamos el código
        try {
          const response = await http.post('/api/auth/code', {
            id: this.id,
            code: this.code,
            
          });
          this.changes = true;
          // Manejar la respuesta del servidor
          console.log("Código recibido: ", this.code, " Id Recibido: ",this.id);
          console.log(response.data);
  
          // Redireccionar al usuario a la página de inicio, por ejemplo:
        //   this.$router.push(`/codePage/forgotPassword/${this.id}`);

        } catch (error) {
          console.log("Código recibido: ", this.code, " Id Recibido: ",this.id);
          this.changes = false;
          console.error('Error de envío de código:', error);
        }
      },

      async change(){
        try{

            const response = await http.put(`/api/user/password/${this.id}`,{
                password: this.password
            })
            this.$router.push('/login');
          console.log(response.data);

        } catch(error){
            console.error("Error: ", error);
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