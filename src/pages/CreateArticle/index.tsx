import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateArticle } from 'features/FormArticle/extensions/FormCreateArticle'

export const CreateArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Статті', to: '/articles' }, { title: 'Створення статті' }]} />
      <Divider />
      <FormCreateArticle />
    </div>
  )
}
