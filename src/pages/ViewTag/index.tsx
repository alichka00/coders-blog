import { Divider } from 'antd'

import { ArticleTable } from './extensions/ArticlesTable'
import { TagInfo } from './extensions/TagInfo'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const ViewTag = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Теги', to: '/tags' }, { title: 'Перегляд тегу' }]} />
      <Divider />

      <C.WrapperPage>
        <TagInfo />
        <C.Brick />
        <ArticleTable />
      </C.WrapperPage>
    </div>
  )
}
