import { useAuthStore } from '@/stores/authStore'
import httpClient from '@/utils/axios'
import { useRouter } from 'vue-router'

export const getCsrfToken = async () => {
  await httpClient.get('csrf-cookie')
}

interface ILoginRequest {
  email: string
  password: string
}

export const login = async (loginRequest: ILoginRequest) => {
  await httpClient
    .post('/login', loginRequest)
    .then(() => useAuthStore().setIsAuthenticatedTo(true))
}

export const register = async () => {}

// export const getUserInfo = async () => {
//   await httpClient.get('/me').then((x) => useAuthStore().setUser(x.data))
// }

export const logout = async () => {
  await httpClient.post('/logout').then(() => useAuthStore().setIsAuthenticatedTo(false))
  useRouter().replace({ name: 'home' })
}
