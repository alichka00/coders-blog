import { Button, Divider } from 'antd'

import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { ArticleTable } from './extensions/ArticlesTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const Articles = () => {
  const [, setSearchParams] = useSearchParams()
  useEffect(() => {
    const params = new URLSearchParams()
    const param = {
      field: 'updatedAt',
      order: 'desc',
    }
    params.append('sort', JSON.stringify(param))
    setSearchParams(params)
  }, [])

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
