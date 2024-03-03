import { I_Article } from 'services/articles/models/responses'

export interface I_Tag {
  id: number
  name: string
  description: string
  icon: string
  createdAt: Date
  updatedAt: Date
  articles?: I_Article[]
}

export type T_TagRecord = I_Tag & {
  key: number
}
