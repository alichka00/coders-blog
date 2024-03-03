import { TableColumnsType } from 'antd'

import { I_Article } from 'services/articles/models/responses'

export const getColumns = (): TableColumnsType<I_Article> => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Назва', dataIndex: 'title' },
]
