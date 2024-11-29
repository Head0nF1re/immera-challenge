import { LocalStorage } from '@/utils/localStorage'
import { ref } from 'vue'

export const useDarkMode = () => {
  const isDarkMode = ref(LocalStorage.getItem('isDarkMode') ?? false)

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode')
  }

  const toggleDarkMode = () => {
    LocalStorage.setItem('isDarkMode', document.documentElement.classList.toggle('dark-mode'))
    isDarkMode.value = !isDarkMode.value
  }

  return { isDarkMode, toggleDarkMode }
}
