import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewsList from '../views/NewsList.vue'

const routes = [
  {
    path: '/',
    component: NewsList,
  },
  {
    path: '/:tag',
    name: 'NewsList',
    component: NewsList,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
