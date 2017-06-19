import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Nav from './Nav.vue'
import Home from './Home.vue'
import Portfolio from './Portfolio.vue'
import Contact from './Contact.vue'

Vue.use(VueRouter);

var routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/contact', component: Contact }
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
