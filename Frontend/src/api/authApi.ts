import httpClient from '@/utils/axios'
import { useRouter } from 'vue-router'
import type { ILoginRequest, RegisterRequest } from './authApiTypes'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/authStore'

export const getCsrfCookie = async () => {
  return await httpClient.get('csrf-cookie')
}

export const login = async (loginRequest: ILoginRequest) => {
  Cookies.remove('XSRF-TOKEN')
  await httpClient
    .post('/login', loginRequest)
    .then(() => useAuthStore().setIsAuthenticatedTo(true))
}

export const register = async (registerRequest: RegisterRequest) => {
  Cookies.remove('XSRF-TOKEN')
  await httpClient.post('/register', registerRequest)
}

// export const getUserInfo = async () => {
//   await httpClient.get('/me').then((x) => useAuthStore().setUser(x.data))
// }

export const logout = async () => {
  await httpClient.post('/logout').then(() => useAuthStore().setIsAuthenticatedTo(false))
  useRouter().replace({ name: 'home' })
}
