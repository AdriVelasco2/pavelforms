import { defineStore } from 'pinia';

export const useUserDataStore = defineStore({
  id: 'userData',
  state: () => ({
    userId: null,
  }),
  actions: {
    saveUserData(userData) {
      this.userId = userData.userId;
    }
  },
  getters: {
    getUserId: state => state.userId,
  }
});
