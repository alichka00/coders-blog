import { ContainerOutlined, TeamOutlined, LockOutlined, TagsOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'

export interface I_MenuItem {
  key: string
  label: string
  icon: ReactNode
  to: string
}

export const menuItems: I_MenuItem[] = [
  {
    key: 'articles',
    label: 'Статті',
    icon: <ContainerOutlined />,
    to: '/articles',
  },
  {
    key: 'tags',
    label: 'Теги',
    icon: <TagsOutlined />,
    to: '/tags',
  },
  {
    key: 'admins',
    label: 'Адміністратори',
    icon: <LockOutlined />,
    to: '/admins',
  },
  {
    key: 'users',
    label: 'Користувачі',
    icon: <TeamOutlined />,
    to: '/users',
  },
]
