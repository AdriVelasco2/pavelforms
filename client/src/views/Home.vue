<template>
  <div>
     <div v-if="isLoggedIn" class="flex flex-col h-screen justify-center items-center"> 
      <h1 class="text-3xl font-bold mb-8">Bienvenido a la página de inicio</h1>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="logout">Cerrar sesión</button>
    </div>
    <div class="flex flex-col h-screen justify-center items-center" v-else >
      <h1 class="text-3xl font-bold mb-8">Inicia sesión para acceder a la página de inicio</h1>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goLogin">INICIA SESIÓN</button>

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