import { useMutation } from '@tanstack/vue-query'
import {
  loginSchema,
  registerSchema,
  updatePasswordSchema,
  updateProfileSchema,
  type LoginFormInitialValues,
} from '@/types/api/authApiTypes'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { ref } from 'vue'
import { getUserInfo, login, logout, register, updatePassword, updateProfile } from '@/api/authApi'
import { useToast } from 'primevue'
import { LocalStorage } from '@/utils/localStorage'

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

  const clearFormLocalStorage = () => {
    LocalStorage.removeItem('formLogin_email')
  }

  const initialValues = ref<LoginFormInitialValues>({
    email: LocalStorage.getItem('formLogin_email') ?? '',
  })

  const resolver = ref(zodResolver(loginSchema))

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await getUserInfo().then((res) => {
        authStore.storeUser(res.data)
        router.push((route.query.redirect as string) ?? '/')
      })

      clearFormLocalStorage()
    },
  })

  return { resolver, mutation, initialValues, clearFormLocalStorage }
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

export const useUpdateProfile = () => {
  const authStore = useAuthStore()
  const toast = useToast()

  const resolver = ref(zodResolver(updateProfileSchema))

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await getUserInfo().then((res) => {
        authStore.storeUser(res.data)
      })
      toast.add({ severity: 'success', summary: 'Profile Updated.', life: 2000 })
    },
  })

  return { resolver, mutation }
}

export const useUpdatePassword = () => {
  const authStore = useAuthStore()

  const resolver = ref(zodResolver(updatePasswordSchema))

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: async () => {
      await getUserInfo().then((res) => {
        authStore.storeUser(res.data)
      })
    },
  })

  return { resolver, mutation }
}
