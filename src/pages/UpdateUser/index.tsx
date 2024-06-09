import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateUser } from 'features/FormUser/extensions/FormUpdateEmail'
import * as C from 'styles/components'

export const UpdateUser = () => {
  return (
    <div>
      <Breadcrumbs
        items={[{ title: 'Користувачі', to: '/users' }, { title: 'Редагування Користувача' }]}
      />
      <Divider />
      <C.WrapperPage>
        <FormUpdateUser />
      </C.WrapperPage>
    </div>
  )
}
