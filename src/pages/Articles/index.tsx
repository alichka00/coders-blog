import { Divider } from 'antd'

import { ArticleTable } from './extensions/ArticlesTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const Articles = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Статті' }]} />
      <Divider />
      <C.WrapperPage>
        <ArticleTable />
      </C.WrapperPage>
    </div>
  )
}
