import { Divider } from 'antd'

import { useParams } from 'react-router-dom'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateEmail } from 'features/FormAdmin/extensions/FormUpdateEmail'
import * as C from 'styles/components'

export const UpdateAdminEmail = () => {
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
        <FormUpdateEmail />
      </C.WrapperPage>
    </div>
  )
}
