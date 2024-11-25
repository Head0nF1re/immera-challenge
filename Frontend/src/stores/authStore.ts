import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types/api/authApiTypes'
import { LocalStorage } from '@/utils/localStorage'

export const useAuthStore = defineStore('auth', () => {
  const localStorageUser = LocalStorage.getItem('user')

  const isAuthenticated = ref(localStorageUser ? true : false)
  const user = ref<IUser | null>(localStorageUser)

  const storeUser = (userData: IUser) => {
    user.value = userData
    isAuthenticated.value = true
    LocalStorage.setItem('user', userData)
  }

  const removeUser = () => {
    user.value = null
    isAuthenticated.value = false
    LocalStorage.removeItem('user')
  }

  return {
    isAuthenticated,
    user,
    storeUser,
    removeUser,
  }
})
