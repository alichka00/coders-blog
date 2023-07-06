import { ReactNode } from 'react'
import { FiUsers } from 'react-icons/fi'
import { RiAdminLine, RiArticleLine } from 'react-icons/ri'

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
    icon: <RiArticleLine />,
    to: '/articles',
  },
  {
    key: 'admins',
    label: 'Адміністратори',
    icon: <RiAdminLine />,
    to: '/admins',
  },
  {
    key: 'users',
    label: 'Користувачі',
    icon: <FiUsers />,
    to: '/users',
  },
]
