import { EditOutlined } from '@ant-design/icons'
import { Button, DescriptionsProps, Space } from 'antd'

import { Link } from 'react-router-dom'

import { T_AdminRecord } from 'models/admin'

import { formatDate } from 'utils/helpers/formatDate'

export const getItems = (items: T_AdminRecord): DescriptionsProps['items'] => [
  {
    label: 'Пошта',
    children: (
      <Space>
        <span>{items.email}</span>
        <Link to='update'>
          <Button type='text' icon={<EditOutlined />} />
        </Link>
      </Space>
    ),
  },
  {
    label: 'Пароль',
    children: (
      <Space>
        <span>••••••••••</span>
        <Link to='updatePassword'>
          <Button type='text' icon={<EditOutlined />} />
        </Link>
      </Space>
    ),
  },
  {
    label: 'Дата створення',
    children: formatDate(items.createdAt),
  },
  {
    label: 'Дата оновлення',
    children: formatDate(items.updatedAt),
  },
]
