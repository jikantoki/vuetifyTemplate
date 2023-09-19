import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/**
 * ここに登録されたページしか使えない
 */
const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      title: 'Top',
      description: 'Vuetifyを簡単に使えるテンプレート'
    }
  },
  {
    path: '/about',
    meta: {
      title: 'About'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:catchAll(.*)', //404
    component: () => import('../views/error/errorNotFound.vue'),
    meta: {
      title: '404 Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
