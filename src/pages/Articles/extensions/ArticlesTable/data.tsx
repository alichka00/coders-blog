import { EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { Link } from 'react-router-dom'

import { TagStatus } from 'components/TagStatus'
import { E_ArticleStatus, T_ArticleRecord } from 'models/article'

import { I_Tag } from 'models/tags'
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
    filters: [
      { text: 'Опубліковано', value: E_ArticleStatus.PUBLISHED },
      { text: 'Перевіряється', value: E_ArticleStatus.CHECKED },
      { text: 'Чернетка', value: E_ArticleStatus.DRAFT },
    ],
    render: (value: E_ArticleStatus) => (
      <Space size='middle'>
        <TagStatus value={value} />
      </Space>
    ),
  },

  {
    title: 'Теги',
    dataIndex: 'tags',
    render: (value: I_Tag[]) => (
      <Space size='small'>
        {value && value.map((item) => <Tag key={item.id}>{item.name}</Tag>)}
      </Space>
    ),
  },

  {
    title: 'Активність ',
    dataIndex: ['views'],
    sorter: {
      multiple: 1,
    },
    render: (value: string, record) => {
      const reactions = [...(record.ArticleReaction || [])].sort((a, b) =>
        a.reaction!.name.localeCompare(b.reaction!.name),
      )
      return (
        <Space size='small'>
          <Tag>{record._count?.ArticleComment || 0}💬</Tag>
          <Tag>{value}👁️</Tag>
          {record.ArticleReaction &&
            reactions.map((item) => {
              if (item.reaction) {
                return (
                  <Tag key={item.reactionId + item.articleId}>
                    {item.counter}
                    {item.reaction.icon}
                  </Tag>
                )
              }
            })}
        </Space>
      )
    },
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

  {
    key: 'action',
    fixed: 'right',
    align: 'center',
    render: (record: T_ArticleRecord) => (
      <Space size='middle'>
        <Link to={`/articles/${record.id}`}>
          <Button icon={<EyeOutlined />} />
        </Link>
      </Space>
    ),
  },
]
