import { Tag } from 'antd'

import { E_ArticleStatus } from 'models/article'

type T_TagStatus = {
  value: E_ArticleStatus
}

const tagColors: Record<E_ArticleStatus, string> = {
  PUBLISHED: 'success',
  CHECKED: 'processing',
  DRAFT: 'default',
}
export const tagStatusText: Record<E_ArticleStatus, string> = {
  PUBLISHED: 'Опубліковано',
  CHECKED: 'Перевіряється',
  DRAFT: 'Чернетка',
}

export const TagStatus = ({ value }: T_TagStatus) => {
  return <Tag color={tagColors[value]}>{tagStatusText[value]}</Tag>
}
