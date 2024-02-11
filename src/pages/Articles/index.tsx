import { Button, Divider } from 'antd'

import { Link } from 'react-router-dom'

import { ArticleTable } from './extensions/ArticlesTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const Articles = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Статті' }]} />
      <Divider />

      <C.WrapperPage>
        <Link to='/articles/create'>
          <Button type='primary' size='large'>
            Створити статтю
          </Button>
        </Link>
        <C.Brick />
        <ArticleTable />
      </C.WrapperPage>
    </div>
  )
}