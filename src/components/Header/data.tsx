import { LogoutOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

import { E_Routes } from 'models/routes'

export const headerTitles: Record<E_Routes, string> = {
  [E_Routes.users]: 'Користувачі',
  [E_Routes.admins]: 'Адміністратори',
  [E_Routes.articles]: 'Статті',
  [E_Routes.viewArticle]: 'Перегляд статті',
  [E_Routes.updateArticle]: 'Редагування статті',
}

interface I_ProfileMenu {
  onLogout: () => void
}

export const profileMenu = ({ onLogout }: I_ProfileMenu): MenuProps => ({
  items: [
    {
      key: '0',
      label: 'Вийти',
      icon: <LogoutOutlined />,
    },
  ],
  onClick: () => {
    onLogout()
  },
})
