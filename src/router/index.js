import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import PlayerCompare from '@/views/PlayerCompare'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/player-compare',
      name: 'PlayerCompare',
      component: PlayerCompare
    }
  ]
})
