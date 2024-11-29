import type { IUser } from '@/types/api/authApiTypes'

export type LocalStorageValues = {
  user: IUser
  isDarkMode: boolean
}

export type LocalStorageKeys = keyof LocalStorageValues
