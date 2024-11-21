import httpClient from '@/utils/axios'
import type { ILoginRequest, IUser, RegisterRequest } from '@/types/authApiTypes'
import Cookies from 'js-cookie'

export const getCsrfCookie = async () => {
  return await httpClient.get('csrf-cookie')
}

export const login = async (loginRequest: ILoginRequest) => {
  Cookies.remove('XSRF-TOKEN')
  return await httpClient.post('/login', loginRequest)
}

export const register = async (registerRequest: RegisterRequest) => {
  return await httpClient.post('/register', registerRequest)
}

export const getUserInfo = async () => {
  return await httpClient.get<IUser>('/auth/me')
}

export const logout = async () => {
  Cookies.remove('XSRF-TOKEN')
  return await httpClient.post('/logout')
}
