import type { User } from '@/types/user'

export type Column = keyof User
export type SortDirection = 'asc' | 'desc' | 'idle'
export type Sort = Record<Column, SortDirection>

export interface Filters {
  name: string
  phone: string
  address: string
}
