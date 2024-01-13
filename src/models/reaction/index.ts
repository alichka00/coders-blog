import { I_Author } from 'services/articles/models/responses'

export interface I_ArticleReaction {
  id: number
  counter: number
  reactionId: number
  articleId: number
  createdAt: Date
  updatedAt: Date
  reaction: I_Reaction
  authors: I_Author[]
}

export interface I_Reaction {
  id: number
  name: string
  icon: string
  createdAt: Date
  updatedAt: Date
}
