import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/index.js";
import './index.scss';
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate/dist/vee-validate.full.esm'
Vue.config.productionTip = false;
Vue.component('ValidationObserver',ValidationObserver);
Vue.component('ValidationProvider',ValidationProvider);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
