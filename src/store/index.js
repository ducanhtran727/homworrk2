import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    valuePage: [],
    loading: true
  },
  getters: {
    getContent(state) {
      return state.valuePage;
    },
  },
  mutations: {
    setDataContent(state, payload) {
      state.valuePage = payload;
    },
  },
  actions: {
    actionGetDataContent: async ({ commit ,state }) => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      commit("setDataContent", res.data);
      state.loading = false;
    },
  },
});
