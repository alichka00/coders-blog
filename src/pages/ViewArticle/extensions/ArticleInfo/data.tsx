import { Tag, DescriptionsProps } from 'antd'

import { I_Article } from 'services/articles/models/responses'
import { formatDate } from 'utils/helpers/formatDate'

export const getItems = (items: I_Article): DescriptionsProps['items'] => [
  {
    label: 'Назва',
    children: items.title,
  },
  {
    label: 'Статус',
    children: items.status,
  },
  {
    label: 'Автор',
    children: items.author.username,
  },
  {
    label: 'Коментарі',
    children: items._count?.ArticleComment,
  },
  {
    label: 'Перегляди',
    children: items.views,
  },
  {
    label: 'Дата створення',
    children: formatDate(items.createdAt),
  },
  {
    label: 'Дата оновлення',
    children: formatDate(items.updatedAt),
  },
  {
    label: 'Теги',
    children: items.tags?.map((item) => <Tag key={item.id}>{item.name}</Tag>),
  },
]
