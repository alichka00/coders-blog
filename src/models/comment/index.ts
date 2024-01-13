import { I_Author } from 'services/articles/models/responses'

export interface I_Comment {
  id: number
  text: string
  articleId: number
  votes: number
  authorId: number
  parentId: null
  createdAt: Date
  updatedAt: Date
  author: I_Author
}

export type T_CommentRecord = I_Comment & {
  key: string
  children?: T_CommentRecord[]
}
