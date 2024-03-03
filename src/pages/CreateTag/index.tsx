import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateTag } from 'features/FormTag/extensions/FormCreateTag'

export const CreateTag = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Теги', to: '/articles' }, { title: 'Створення тегу' }]} />
      <Divider />
      <FormCreateTag />
    </div>
  )
}
