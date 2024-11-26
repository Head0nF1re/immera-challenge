import { z } from 'zod'

export interface IProduct {
  id: number
  name: string
  slug: string
  description: string
  deleted_at: Date | null
  created_at: Date
  updated_at: Date
  user_id: number
}

// export type CreateOrUpdateProductRequest = Pick<IProduct, 'name' | 'description'>

export const createOrUpdateProductSchema = z.object({
  name: z.string().trim().min(1, { message: 'Required' }).max(255),
  description: z.string().trim().min(1, { message: 'Required' }).max(1000),
})

export type CreateOrUpdateProductRequest = z.infer<typeof createOrUpdateProductSchema>
