export interface ILoginRequest {
  email: string
  password: string
}

export interface IRegisterRequest {
  name: string
  email: string
  phone_number: string
  password: string
  passwordConfirm: string
}
