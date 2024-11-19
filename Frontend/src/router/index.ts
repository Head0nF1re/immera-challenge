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
      path: '/login',
      name: 'login',
      component: AboutView,
    },
    {
      path: '/register',
      name: 'register',
      component: AboutView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: AboutView,
      meta: { requiresAuth: true },
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

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
