import Vue from 'vue'
import Router from 'vue-router'
import ViewImageDiff from '@/components/ViewImageDiff.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', component: ViewImageDiff }
  ],
  mode: 'history'
})
