import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/products',
      name: 'products.list',
      component: AboutView,
      meta: { requiresAuth: true },
      children: [
        {
          path: ':id',
          name: 'products.item',
          component: AboutView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
