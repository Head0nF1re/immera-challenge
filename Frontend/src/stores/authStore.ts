import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const setIsAuthenticatedTo = (loggedIn: boolean) => {
    isAuthenticated.value = loggedIn
  }

  return { isAuthenticated, setIsAuthenticatedTo }
})
