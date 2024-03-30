import { Divider } from 'antd'

import { AdminInfo } from './extensions/AdminInfo'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const ViewAdmin = () => {
  return (
    <div>
      <Breadcrumbs
        items={[{ title: 'Адміністратори', to: '/admins' }, { title: 'Перегляд адміністратора' }]}
      />
      <Divider />
      <C.WrapperPage>
        <AdminInfo />
      </C.WrapperPage>
    </div>
  )
}
