import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { I_Author } from 'services/articles/models/responses'

type T_GetColumnsProps = {
  onDelete: (authorId: number) => void
}

export const getColumns = ({ onDelete }: T_GetColumnsProps): ColumnsType<I_Author> => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Користувач', dataIndex: 'username' },
  {
    key: 'action',
    render: (record) => (
      <Space size='middle'>
        <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
      </Space>
    ),
    align: 'center',
  },
]
