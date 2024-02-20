<template>
  <div>
    <div v-if="isLoggedIn">
      <h2>Bienvenido a la página de inicio</h2>
      <button @click="logout">Cerrar sesión</button>
    </div>
    <div v-else>
      <h2>Inicia sesión para acceder a la página de inicio</h2>
      <button @click="goLogin">INICIA SESIÓN</button>

    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/authStore';

export default {
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.clearToken();
      this.$router.push('/login');
    },
    goLogin() {
      this.$router.push('/login');
    }
  },
  computed: {
    isLoggedIn() {
      const authStore = useAuthStore();
      return authStore.isLoggedIn;
    }
  }
};
</script>