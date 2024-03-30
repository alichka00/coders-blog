import { EyeOutlined } from '@ant-design/icons'
import { Button, Space, TableColumnsType } from 'antd'

import { Link } from 'react-router-dom'

import { T_AdminRecord } from 'models/admin'

import { formatDate } from 'utils/helpers/formatDate'

export const getColumns = (): TableColumnsType<T_AdminRecord> => [
  { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id },
  { title: 'Пошта', dataIndex: 'email' },
  {
    title: 'Дата створення',
    dataIndex: 'createdAt',
    render: (value: string) => <Space>{formatDate(value)}</Space>,
  },
  {
    key: 'action',
    fixed: 'right',
    align: 'center',
    render: (record) => (
      <Space size='middle'>
        <Link to={`/admins/${record.id}`}>
          <Button icon={<EyeOutlined />} />
        </Link>
      </Space>
    ),
  },
]
