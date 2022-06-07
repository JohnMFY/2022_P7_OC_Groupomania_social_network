import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NetworkView from '../views/NetworkView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Network',
    name: 'Network',
    component: NetworkView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
