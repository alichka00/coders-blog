import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateEmail } from 'features/FormAdmin/extensions/FormUpdateEmail'
import * as C from 'styles/components'

export const UpdateAdminEmail = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { title: 'Адміністратори', to: '/admins' },
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
