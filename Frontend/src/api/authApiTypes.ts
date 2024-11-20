import { z } from 'zod'

export interface ILoginRequest {
  email: string
  password: string
}

export type RegisterRequest = z.infer<typeof registerSchema>

export const registerSchema = z.object({
  name: z.string().trim().min(1, { message: 'Required' }).max(255),
  email: z.string().email().max(255),
  phone_number: z
    .string()
    .min(9)
    .max(13, { message: 'Phone number must be a valid Portuguese mobile number.' }),
  password: z.string().min(8).max(255),
  password_confirmation: z.string().min(8).max(255),
})
