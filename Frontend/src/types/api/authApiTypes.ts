import { z } from 'zod'

export interface IUser {
  id: number
  name: string
  email: string
  email_verified_at: Date
  phone_number: string
  phone_number_verified_at: Date
  created_at: Date
  updated_at: Date
}

const nameSchema = z.string().trim().min(1, { message: 'Required' }).max(255)
const emailSchema = z.string().email().max(255)
const passwordSchema = z.string().min(8).max(255)

const phoneNumberSchema = z
  .string()
  .transform((value) => value.replace(/\s+/g, ''))
  .pipe(
    z
      .string()
      .min(9)
      .max(13, { message: 'Phone number must be a valid Portuguese mobile number.' }),
  )

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone_number: phoneNumberSchema,
    password: passwordSchema,
    password_confirmation: passwordSchema,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  })

export type RegisterRequest = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginRequest = z.infer<typeof loginSchema>
export type LoginFormInitialValues = Omit<LoginRequest, 'password'>

export const updateProfileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone_number: phoneNumberSchema,
})

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>

export const updatePasswordSchema = z
  .object({
    current_password: passwordSchema,
    password: passwordSchema,
    password_confirmation: passwordSchema,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  })

export type UpdatePasswordRequest = z.infer<typeof updatePasswordSchema>
