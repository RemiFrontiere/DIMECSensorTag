import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import page1 from '@/components/page1'
import Trend from 'vuetrend'

Vue.use(Trend)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/page1',
      name: 'Appli 1',
      component: page1
    }
  ]
})
