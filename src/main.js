import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Nav from './Nav.vue'
import Home from './Home.vue'
import Scores from './Scores.vue'
// import Login from './Login.vue'

Vue.use(VueRouter);

var routes = [
  { path: '/', component: Home },
  { path: '/scores', component: Scores },
  // { path: '/login', component: Login }
];

var router = new VueRouter({
  routes: routes,
  mode: 'history'
});

Vue.component('app-nav', Nav);

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
