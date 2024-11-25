import { useMutation } from '@tanstack/vue-query'
import { loginSchema, registerSchema } from '@/types/api/authApiTypes'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { ref } from 'vue'
import { getUserInfo, login, logout, register } from '@/api/authApi'

export const useRegister = () => {
  const router = useRouter()
  const authStore = useAuthStore()

  const resolver = ref(zodResolver(registerSchema))

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: async () => {
      await getUserInfo().then((res) => {
        authStore.storeUser(res.data)
        router.push({ name: 'home' })
      })
    },
  })

  return { resolver, mutation }
}

export const useLogin = () => {
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  const resolver = ref(zodResolver(loginSchema))

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await getUserInfo().then((res) => {
        authStore.storeUser(res.data)
        router.push((route.query.redirect as string) ?? '/')
      })
    },
  })

  return { resolver, mutation }
}

export const useLogout = () => {
  const router = useRouter()
  const authStore = useAuthStore()

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      authStore.removeUser()
      router.push({ name: 'home' })
    },
  })

  return { mutation }
}
