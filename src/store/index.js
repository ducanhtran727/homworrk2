import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    valuePage: [],
    editPage: null,
    loading: true,
    sendValue:null
  },
  getters: {
    getContent(state) {
      return state.valuePage;
    },
    getEditContent(state) {
      return state.editPage;
    },
  },
  mutations: {
    setDataContent(state, payload) {
      state.valuePage = payload;
    },
    deleteItem(state, payload) {
      const indexResult = state.valuePage.findIndex(
        (item) => item.id === payload
      );
      if (indexResult >= 0) {
        state.valuePage.splice(indexResult, 1);
      }
    },
    getEditItem(state, payload) {
      state.editPage = payload;
    },
    updateItem(state ,payload){
      // state.sendValue = payload;
      const indexResult = state.valuePage.findIndex(
        (item) => item.id === payload.id
      )
      state.valuePage[indexResult] = payload
    },
    addItem(state, payload){
      state.valuePage.unshift(payload)
    }
  },
  actions: {
    actionGetDataContent: async ({ commit, state }) => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      commit("setDataContent", res.data);
      state.loading = false;
    },
    actionDeleteDataContent: async ({ commit }, payload) => {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${payload}`
      );
      commit("deleteItem", payload);
    },
    actionGetEditDataContent: ({ commit }, payload) => {
      commit("getEditItem", payload);
    },
    actionUpdateItem : async ({ commit , state},payload) => {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${state.editPage.id}`,payload)
      commit("updateItem",payload)
    },
    actionAddItem : async ({ commit }, payload) => {
      await axios.post("https://jsonplaceholder.typicode.com/posts",payload)
      commit("addItem",payload)
    }
  },
});
