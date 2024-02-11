import { Divider } from 'antd'

import { useParams } from 'react-router-dom'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateArticle } from 'features/FormArticle/extensions/FormUpdateArticle'

export const UpdateArticle = () => {
  const param = useParams()

  return (
    <div>
      <Breadcrumbs
        items={[
          { title: 'Статті' },
          { title: 'Перегляд статті ', to: `/articles/${param.id}` },
          { title: 'Редагування статті' },
        ]}
      />
      <Divider />
      <FormUpdateArticle />
    </div>
  )
}
