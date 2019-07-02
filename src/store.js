import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    currentZone: {},
    isLoading: true,
    zones: [],
    Countys: '',
  },
  mutations: {
    GETDATA(state, payload) {
      state.zones = payload;
      const num = Math.floor(Math.random() * state.zones.length);
      state.currentZone = state.zones[num - 1];
      state.Countys = state.currentZone.County;
    },
    GETCURRENTZONE(state, payload) {
      state.currentZone = payload;
    },
    ISLOADING(state, status) {
      state.isLoading = status;
    },
    GETCOUNTYS(state, payload) {
      state.Countys = payload;
    },
  },
  actions: {
    getData(context) {
      const api = `${process.env.VUE_APP_GoogleAppScript}?url=${process.env.VUE_APP_AQI}`;
      fetch(api, { method: 'get' }).then(response => response.json()).then((data) => {
        context.commit('GETDATA', data);
        context.commit('ISLOADING', false);
      }).catch((err) => {
        throw new Error(err);
      });
    },
  },
  getters: {
    currentZone: state => state.currentZone,
    isLoading: state => state.isLoading,
    zones: state => state.zones,
    Countys: state => state.Countys,
  },
});
