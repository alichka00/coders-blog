import { DescriptionsProps } from 'antd'

import { I_Tag } from 'models/tags'

export const getItems = (items: I_Tag): DescriptionsProps['items'] => [
  {
    label: 'Назва',
    children: items.name,
  },
  {
    label: 'Іконка',
    children: items.icon ? <i style={{ fontSize: 32 }} className={String(items.icon)} /> : '-',
  },
  {
    label: 'Опис',
    children: items.description,
  },
]
