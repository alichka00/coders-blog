import { Button, Divider } from 'antd'

import { Link } from 'react-router-dom'

import { AdminsTable } from './extensions/AdminsTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const Admins = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Адміністратори' }]} />
      <Divider />
      <C.WrapperPage>
        <Link to='/admins/create'>
          <Button type='primary' size='large'>
            Створити Адміністратора
          </Button>
        </Link>
        <C.Brick />
        <AdminsTable />
      </C.WrapperPage>
    </div>
  )
}
