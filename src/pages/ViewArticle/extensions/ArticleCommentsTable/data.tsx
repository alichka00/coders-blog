import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { I_Comment, T_CommentRecord } from 'models/comment'

type T_GetColumnsProps = {
  onDelete: (commentId: number) => void
}

export const getColumns = ({ onDelete }: T_GetColumnsProps): ColumnsType<I_Comment> => [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Користувач', dataIndex: ['author', 'username'] },
  { title: 'Текст', dataIndex: 'text' },
  { title: 'Голоси', dataIndex: 'votes' },
  {
    key: 'action',
    render: (record: T_CommentRecord) => (
      <Space size='middle'>
        <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
      </Space>
    ),
    align: 'center',
  },
]
