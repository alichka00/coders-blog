import { Divider } from 'antd'

import { ArticleCommentsTable } from './extensions/ArticleCommentsTable'
import { ArticleInfo } from './extensions/ArticleInfo'

import { ArticleReactionsTable } from './extensions/ArticleReactionsTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const ViewArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Статті', to: '/articles' }, { title: 'Перегляд статті' }]} />
      <Divider />
      <C.WrapperPage>
        <ArticleInfo />
        <C.Brick />
        <ArticleCommentsTable />
        <C.Brick />
        <ArticleReactionsTable />
      </C.WrapperPage>
    </div>
  )
}
