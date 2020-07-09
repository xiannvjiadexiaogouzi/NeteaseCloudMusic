import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import axios from 'axios'
import api from './assets/js/api'

import './assets/scss/reset.scss'
import './assets/js/rem.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import { Lazyload, Notify } from 'vant';

Vue.use(Lazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: ['scroll']
}).use(Notify);


Vue.config.productionTip = false

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
