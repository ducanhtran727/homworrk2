import Vue from "vue";
import VueRouter from "vue-router";
import Form from '../views/Form'
Vue.use(VueRouter);

const routes = [
  {path:'/form' , name:'form' , component:Form}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
