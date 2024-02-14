import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import TelosCloudPage from '../views/TelosCloudPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    // el home redirige a la página principal telos-cloud
    path: '/',
    redirect: '/telos-cloud'
  },
  {
    path: '/telos-cloud',
    name: 'telos-cloud',
    component: TelosCloudPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
