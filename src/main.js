import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'
import router from './router'
import VueLodash from 'vue-lodash'

import cornerstonePlugin from '@/plugins/cornerstonePlugin'

Vue.config.productionTip = false

// Vue.use(BootstrapVue)
Vue.use(VueLodash)
Vue.use(cornerstonePlugin)

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
