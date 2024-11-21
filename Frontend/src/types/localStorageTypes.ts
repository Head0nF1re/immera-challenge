import type { IUser } from '@/types/authApiTypes'

export type LocalStorageValues = {
  user: IUser
}

export type LocalStorageKeys = keyof LocalStorageValues
