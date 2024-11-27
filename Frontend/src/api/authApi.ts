import httpClient from '@/utils/axios'
import type {
  IUser,
  LoginRequest,
  RegisterRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
} from '@/types/api/authApiTypes'
import Cookies from 'js-cookie'

export const getCsrfCookie = async () => {
  return await httpClient.get('csrf-cookie')
}

export const login = async (loginRequest: LoginRequest) => {
  Cookies.remove('XSRF-TOKEN')
  return await httpClient.post('/login', loginRequest)
}

export const register = async (registerRequest: RegisterRequest) => {
  Cookies.remove('XSRF-TOKEN')
  return await httpClient.post('/register', registerRequest)
}

export const getUserInfo = async () => {
  return await httpClient.get<IUser>('/auth/me')
}

export const logout = async () => {
  Cookies.remove('XSRF-TOKEN')
  return await httpClient.post('/logout')
}

export const updateProfile = async (updateProfile: UpdateProfileRequest) => {
  return await httpClient.put('/user/profile-information', updateProfile)
}

export const updatePassword = async (updatePassword: UpdatePasswordRequest) => {
  return await httpClient.put('/user/password', updatePassword)
}
