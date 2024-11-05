export interface User {
  id: string
  name: string
  date: string
  address: string
  phone: string
}

export type Column = keyof User
