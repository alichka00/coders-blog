import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateAdmin } from 'features/FormAdmin/extensions/FormCreate'
import * as C from 'styles/components'

export const CreateAdmin = () => {
  return (
    <div>
      <Breadcrumbs
        items={[{ title: 'Адміністратори', to: '/admins' }, { title: 'Створення адміністратора' }]}
      />
      <Divider />
      <C.WrapperPage>
        <FormCreateAdmin />
      </C.WrapperPage>
    </div>
  )
}
