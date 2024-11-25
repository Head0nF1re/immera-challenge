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

const emailSchema = z.string().email().max(255)
const passwordSchema = z.string().min(8).max(255)

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Required' }).max(255),
    email: emailSchema,
    phone_number: z
      .string()
      .transform((value) => value.replace(/\s+/g, ''))
      .pipe(
        z
          .string()
          .min(9)
          .max(13, { message: 'Phone number must be a valid Portuguese mobile number.' }),
      ),
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
