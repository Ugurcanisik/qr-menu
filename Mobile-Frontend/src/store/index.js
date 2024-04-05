import Vue from "vue";
import Vuex from "vuex";
import MenuList from "@/store/modules/menuList";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {

  },
  modules: {
    MenuList
  }
});
