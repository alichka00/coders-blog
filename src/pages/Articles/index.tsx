import { Divider } from 'antd'

import { ArticleTable } from './extensions/ArticlesTable'

import { Breadcrumbs } from 'components/Breadcrumbs'

export const Articles = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Статті' }]} />
      <Divider />
      <ArticleTable />
    </div>
  )
}
