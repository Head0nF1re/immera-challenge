import { useMutation, useQuery } from '@tanstack/vue-query'
import { registerSchema, type IUser } from '@/types/authApiTypes'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { ref } from 'vue'
import { getUserInfo, register } from '@/api/authApi'

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
