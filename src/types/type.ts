import type { User } from '@/types/user'

export type Column = keyof User
export type Sort = 'asc' | 'desc' | 'idle'

export interface Filters {
  name: string
  phone: string
  address: string
}
