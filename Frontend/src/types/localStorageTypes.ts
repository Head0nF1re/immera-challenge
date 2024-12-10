import type { IUser, LoginFormInitialValues } from '@/types/api/authApiTypes'
import type { Type } from 'typescript'

export type LocalStorageValues = {
  user: IUser
  isDarkMode: boolean
  formLogin_email: string
}

export type LocalStorageKeys = keyof LocalStorageValues

/** 
 * 
export type LocalStorageValues = {
  user: IUser
  isDarkMode: boolean
  formLogin: LoginFormInitialValues
  test: {
    t1: boolean
  }
}

// Get nested string keys: https://stackoverflow.com/a/58436959/13866925
type Paths<T> = T extends object
  ? { [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K]>}`}` }[keyof T]
  : never

// export type LocalStorageKeys = Paths<LocalStorageValues>
export type LocalStorageKeys = Paths<LocalStorageValues>
// export type LocalStorageKeys = keyof LocalStorageValues

function getItem<K extends LocalStorageKeys>(key: K): LocalStorageValues[K] | null {}

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]

type S1 = Split<'formLogin.email.test', '.'>

type Test<T> = T extends object
  ? { [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K]>}`}` }[keyof T]
  : never

type Result<K1 extends LocalStorageKeys> = LocalStorageValues[K1]

export type TestTypes = Result<'formLogin.email'>

export const t1: LocalStorageValues['test'] = true

*/
