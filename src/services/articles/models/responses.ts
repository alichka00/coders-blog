import { E_ArticleStatus } from 'models/article'
import { I_Comment } from 'models/comment'
import { I_Reaction } from 'models/reaction'
import { I_Tag } from 'models/tags'

export type T_ArticleId = number

export interface I_Author {
  id: number
  username: string
  email: string
  avatar: string
  from: string
  createdAt: Date
  updatedAt: Date
}

export interface I_Article {
  id: T_ArticleId
  title: string
  content: string
  status: E_ArticleStatus
  authorId: number
  createdAt: string
  updatedAt: string
  author: I_Author
  tags?: I_Tag[]
  ArticleComment: I_Comment[]
  ArticleReaction?: T_ArticleReaction[]
  views: number
  _count?: {
    ArticleComment: number
  }
}

export interface T_ArticleReaction {
  id: number
  counter: number
  reactionId: number
  articleId: number
  createdAt: Date
  updatedAt: Date
  reaction?: I_Reaction
  authors?: I_Author[]
}

export interface I_Info {
  total: number
}

export interface I_ResponseArticles {
  data: I_Article[]
  info: I_Info
}

export type T_ArticleDataType = I_Article & {
  key: number
}

export interface I_ResponseArticle {
  data: I_Article
}
