import type { LocalStorageKeys } from '@/types/localStorageTypes'
import { LocalStorage } from '@/utils/localStorage'
import { useDebounceFn } from '@vueuse/core'

export const useOnInputChange = useDebounceFn((newValue, key: LocalStorageKeys) => {
  LocalStorage.setItem(key, newValue)
}, 1000)
