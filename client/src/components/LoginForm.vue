<template>
  <div>
    <h2>Agregar Usuario</h2>
    <form @submit.prevent="agregarUsuario">
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="usuario.name" required><br>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="usuario.email" required><br>
      <button type="submit">Agregar Usuario</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        name: '',
        email: ''
            }
    };
  },
  methods: {
    async agregarUsuario() {
      try {
        const response = await fetch('/agregar-pareja', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.usuario)
        });
        const data = await response.json();
        console.log('Usuario agregado:', data);
        // Puedes hacer algo con la respuesta, como redirigir o mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error al agregar usuario:', error);
      }
    }
  }
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
