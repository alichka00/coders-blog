import { Divider } from 'antd'

import { useParams } from 'react-router-dom'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdatePassword } from 'features/FormAdmin/extensions/FormUpdatePassword'
import * as C from 'styles/components'

export const UpdateAdminPassword = () => {
  const param = useParams()
  return (
    <div>
      <Breadcrumbs
        items={[
          { title: 'Адміністратори', to: '/admins' },
          { title: 'Перегляд адміністратора ', to: `/admins/${param.id}` },
          { title: 'Редагування адміністратора' },
        ]}
      />
      <Divider />
      <C.WrapperPage>
        <FormUpdatePassword />
      </C.WrapperPage>
    </div>
  )
}
