import type { IUser, LoginFormInitialValues } from '@/types/api/authApiTypes'

export type LocalStorageValues = {
  user: IUser
  isDarkMode: boolean
  formLogin: LoginFormInitialValues
}

// Paths Type - Get nested string keys: https://stackoverflow.com/a/58436959/13866925
type Paths<T> = T extends object
  ? { [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K]>}`}` }[keyof T]
  : never

export type LocalStorageKeys = Paths<LocalStorageValues>

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]

export type LocalStorageReturnTypeOfKey<K1 extends LocalStorageKeys> =
  Split<K1, '.'> extends string[] & { 0: string; 1: string }
    ? LocalStorageValues[Split<K1, '.'>[0]][Split<K1, '.'>[1]]
    : Split<K1, '.'> extends string[] & { 0: string }
      ? LocalStorageValues[Split<K1, '.'>[0]]
      : null
