import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MetaFunction from '@/functions/metaFunctions'

/**
 * ここに登録されたページしか使えない
 */
const routes = [
  {
    path: '/',
    component: () => import('@/views/indexView.vue'),
    meta: {
      title: 'Top',
      /**
       * 配列の最初のページのみdescriptionが必須
       */
      description: 'Vuetifyを簡単に使えるテンプレート'
    }
  },
  {
    path: '/vuetify',
    component: HomeView,
    meta: {
      title: 'Old Hello',
      description: 'Vuetify Sample Page'
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
      import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/login',
    meta: {
      title: 'Login',
      description: 'ログインページ'
    },
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/registar',
    meta: {
      title: 'Registar',
      description: '新規登録ページ'
    },
    component: () => import('@/views/RegistarView.vue')
  },
  {
    path: '/:catchAll(.*)', //404
    component: () => import('@/views/error/errorNotFound.vue'),
    meta: {
      title: '404 Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/**
 * 現在のページのメタ情報を出している…が、リアルタイムな反映はされない
 */
let currentMeta
export default router
export { currentMeta }

router.afterEach((to) => {
  MetaFunction.setTitle(to.meta.title)
  if (to.meta.description) {
    MetaFunction.updateMeta('og:description', to.meta.description)
    MetaFunction.updateMeta('description', to.meta.description)
  } else {
    MetaFunction.updateMeta('og:description', routes[0].meta.description)
    MetaFunction.updateMeta('description', routes[0].meta.description)
  }
  currentMeta = to.meta
  //console.log('page moved')
})
