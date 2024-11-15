import { createStore } from "vuex";
import authService from "@/services/auth.service";
async function fetchRole() {
  const role = (await authService.getRole()).data.role;
  return role;
}
const store = createStore({
  state: {
    Role: "",
  },
  mutations: {
    setRole(state, newValue) {
      state.Role = newValue;
    },
  },
  actions: {
    updateRole({ commit }, newValue) {
      commit("setRole", newValue);
    },
    async fetchRole({ commit }) {
      try {
        const role = await fetchRole();
        commit("setRole", role);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    },
  },
  getters: {
    Role: (state) => state.Role,
  },
});

export default store;
