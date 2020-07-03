import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSSE from 'vue-sse';
import router from './router'
import VueEvents from 'vue-events'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io(store.state.host);

Vue.use(VueSocketIOExt, socket);
Vue.use(VueSSE);
Vue.use(VueEvents)
Vue.use(VueMaterial)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')