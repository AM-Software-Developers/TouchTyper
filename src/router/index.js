import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Welcome'
import Play from '../components/Play'
import Settings from '../components/Settings'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },{
    path: '/play',
    name: 'Play',
    component: Play
  },{
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
]

const router = new VueRouter({
  routes
})

export default router
