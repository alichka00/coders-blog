import { I_Article } from 'services/articles/models/responses'

export enum E_ArticleStatus {
  PUBLISHED = 'PUBLISHED',
  CHECKED = 'CHECKED',
  DRAFT = 'DRAFT',
}

export type T_ArticleRecord = I_Article & {
  key: React.Key
}
