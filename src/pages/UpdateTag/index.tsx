import { Divider } from 'antd'

import { useParams } from 'react-router-dom'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateTag } from 'features/FormTag/extensions/FormUpdateTag'

export const UpdateTag = () => {
  const param = useParams()
  return (
    <div>
      <Breadcrumbs
        items={[
          { title: 'Теги', to: '/articles' },
          { title: 'Перегляд тегу ', to: `/tags/${param.id}` },
          { title: 'Редагування тегу' },
        ]}
      />
      <Divider />
      <FormUpdateTag />
    </div>
  )
}
