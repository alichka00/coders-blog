import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateUser } from 'features/FormUser/extensions/FormCreate'
import * as C from 'styles/components'

export const CreateUser = () => {
  return (
    <div>
      <Breadcrumbs
        items={[{ title: 'Користувачі', to: '/users' }, { title: 'Створення користувача' }]}
      />
      <Divider />
      <C.WrapperPage>
        <FormCreateUser />
      </C.WrapperPage>
    </div>
  )
}
