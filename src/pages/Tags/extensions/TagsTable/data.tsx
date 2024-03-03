import { EyeOutlined } from '@ant-design/icons'
import { Button, Space, TableColumnsType } from 'antd'

import { Link } from 'react-router-dom'

import { T_TagRecord } from 'models/tags'
import { formatDate } from 'utils/helpers/formatDate'

export const getColumns = (): TableColumnsType<T_TagRecord> => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Назва', dataIndex: 'name' },
  {
    title: 'Іконка',
    dataIndex: 'icon',
    render: (value: string) => (value ? <i style={{ fontSize: 24 }} className={value} /> : '–'),
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
  { title: 'К-сть статей', dataIndex: ['_count', 'articles'] },
  {
    key: 'action',
    fixed: 'right',
    align: 'center',
    render: (record) => (
      <Space size='middle'>
        <Link to={`/tags/${record.id}`}>
          <Button icon={<EyeOutlined />} />
        </Link>
      </Space>
    ),
  },
]
