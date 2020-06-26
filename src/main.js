import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSSE from 'vue-sse';
import router from './router'
import VueEvents from 'vue-events'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

Vue.use(VueSSE);
Vue.use(VueEvents)
Vue.use(VueMaterial)
Vue.config.productionTip = false 
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO(store.state.host),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
