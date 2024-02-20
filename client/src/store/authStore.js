import { defineStore } from 'pinia';
import http from '@/services/HttpService';
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isLoggedIn: false,
    token: null
  }),
  actions: {
    setToken(token) {
      this.token = token;
      this.isLoggedIn = true;
    },
    clearToken() {
      this.token = null;
      this.isLoggedIn = false;
    },
    async register(userData) {
        try {
          const response = await http.post('/api/auth/createAccount', JSON.stringify(userData),{
            headers: {
              "Content-Type": "application/json",
            },
          });
         
          if (response.status === 201) {
            console.log("La solicitud fue exitosa");
            console.log(response.data); // Aquí obtienes los datos de la respuesta
            // Realizar acciones con la respuesta recibida
            return true;
          } else {
            console.error(
              "La solicitud falló con el código de estado:",
              response.status
            );
            return false;
            // Manejar el error de acuerdo a tu lógica
          }
          // Registro exitoso
          
        } catch (error) {
          console.error('Error de registro:', error);
          return false; // Registro fallido
        }
      }
  }
});
