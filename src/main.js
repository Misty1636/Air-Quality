import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Num from './filters/Num';
import Size from './filters/Size';
import Color from './filters/Color';

Vue.filter('getNum', Num);
Vue.filter('getSize', Size);
Vue.filter('getColor', Color);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
