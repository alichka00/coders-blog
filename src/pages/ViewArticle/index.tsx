import { Divider, Row } from 'antd'

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
        <Divider orientation='left' orientationMargin='0'>
          Загальна інформація
        </Divider>
        <ArticleInfo />
        <C.Brick />
        <Divider orientation='left' orientationMargin='0'>
          Коментарі
        </Divider>
        <ArticleCommentsTable />
        <Divider orientation='left' orientationMargin='0'>
          Реакції
        </Divider>
        <Row gutter={[16, 4]}>
          <ArticleReactionsTable />
        </Row>
      </C.WrapperPage>
    </div>
  )
}
