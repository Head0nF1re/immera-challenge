import type { IUser } from '@/types/api/authApiTypes'

export type LocalStorageValues = {
  user: IUser
}

export type LocalStorageKeys = keyof LocalStorageValues
