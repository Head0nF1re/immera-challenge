import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  // const user = ref(null)

  function setIsAuthenticatedTo(loggedIn: boolean) {
    isAuthenticated.value = loggedIn
  }

  // function setUser(loggedIn: boolean) {
  //   isAuthenticated.value = loggedIn
  // }

  return { isAuthenticated, setIsAuthenticatedTo }
})
