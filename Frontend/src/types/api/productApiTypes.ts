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
