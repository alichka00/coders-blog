import { Divider } from 'antd'

import { useParams } from 'react-router-dom'

import { Breadcrumbs } from 'components/Breadcrumbs'

import { useUpdateArticleMutation } from 'services/articles'

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
      <h4>—ฅ/ᐠ. ̫ .ᐟ\ฅ — MEOW</h4>
    </div>
  )
}
