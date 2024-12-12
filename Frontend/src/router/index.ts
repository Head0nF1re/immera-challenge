import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')
const ProfileView = () => import('@/views/auth/ProfileView.vue')
const NotFoundView = () => import('@/views/errors/NotFoundView.vue')
const ProductListView = () => import('@/views/products/ProductListView.vue')
const ForbiddenView = () => import('@/views/errors/ForbiddenView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/products',
      name: 'products.list',
      component: ProductListView,
      meta: { requiresAuth: true },
      // children: [
      //   {
      //     path: ':id',
      //     name: 'products.item',
      //     component: AboutView,
      //   },
      // ],
    },
    {
      path: '/errors/403',
      name: '403',
      component: ForbiddenView,
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

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
