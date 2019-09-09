import Vue from 'vue'
import App from './App'
import router from './router'
import VueLodash from 'vue-lodash'
import Toasted from 'vue-toasted'

import cornerstonePlugin from '@/plugins/cornerstonePlugin'

Vue.config.productionTip = false

// Vue.use(BootstrapVue)
Vue.use(VueLodash)
Vue.use(cornerstonePlugin)
Vue.use(Toasted)

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
