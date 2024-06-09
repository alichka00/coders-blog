import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Space, TableColumnsType } from 'antd'

import { Link } from 'react-router-dom'

import { T_UserRecord } from 'models/user'
import { formatDate } from 'utils/helpers/formatDate'

interface I_GetColumnsProps {
  handleDelete: (id: number) => void
  handleOpenModal: (id: number) => void
}

export const getColumns = ({
  handleOpenModal,
  handleDelete,
}: I_GetColumnsProps): TableColumnsType<T_UserRecord> => [
  { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id },
  { title: "Ім'я", dataIndex: 'username' },
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
        <Button icon={<EyeOutlined />} onClick={() => handleOpenModal(record.id)} />
        <Link to={`/users/${record.id}/update`}>
          <Button icon={<EditOutlined />} />
        </Link>
        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
      </Space>
    ),
  },
]
