import { SearchOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { T_ArticleDataType } from 'services/articles/models/responses'
import { formatDate } from 'utils/helpers/date'
import { I_ColumnSearch, getColumnSearch } from 'utils/tables/columnSearch'

interface I_GetColumns {
  searchOptions: I_ColumnSearch
}

export const getColumns = ({ searchOptions }: I_GetColumns): ColumnsType<T_ArticleDataType> => [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      multiple: 1,
    },
  },
  {
    title: 'Назва',
    dataIndex: 'title',
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    ...getColumnSearch({ ...searchOptions, dataIndex: ['title'] }),
  },
  {
    title: 'Статус',
    dataIndex: 'status',
  },
  {
    title: 'Автор',
    dataIndex: ['author', 'username'],
    sorter: {
      multiple: 1,
    },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    ...getColumnSearch({ ...searchOptions, dataIndex: ['author', 'username'] }),
  },
  {
    title: 'Дата створення',
    dataIndex: 'createdAt',
    render: (value: string) => <Space>{formatDate(value)}</Space>,
  },
  {
    title: 'Дата оновлення',
    dataIndex: 'updatedAt',
    render: (value: string) => <Space>{formatDate(value)}</Space>,
  },
]
