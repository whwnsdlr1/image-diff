import Vue from 'vue'
import App from './App'
import router from './router'
import VueLodash from 'vue-lodash'
import Toasted from 'vue-toasted'

import modal from '@/plugins/modal'

Vue.config.productionTip = false

// Vue.use(BootstrapVue)
Vue.use(VueLodash)
Vue.use(modal)
Vue.use(Toasted)

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
