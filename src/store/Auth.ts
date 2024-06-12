import { defineStore } from "pinia";

interface IStateShape {
  token: string;
  isAuthenticated: boolean;
}
const useAuthStore = defineStore("AuthStore", {
  state: (): IStateShape => ({
    token: "",
    isAuthenticated: false,
  }),
  getters: {
    getAuth(state) {
      return {
        token: state.token,
        isAuth: state.isAuthenticated,
      };
    },
  },
  actions: {},
});

export default useAuthStore;
