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
  id: number
  title: string
  content: string
  status: string
  authorId: number
  createdAt: string
  updatedAt: string
  author: I_Author
}

export interface I_Info {
  total: number
}

export interface I_Response {
  data: I_Article[]
  info: I_Info
}

export type T_ArticleDataType = I_Article & {
  key: number
}
