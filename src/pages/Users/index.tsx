import { Button, Divider } from 'antd'

import { Link } from 'react-router-dom'

import { UsersTable } from './extensions/UsersTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const Users = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Користувачі' }]} />
      <Divider />
      <C.WrapperPage>
        <Link to='/users/create'>
          <Button type='primary' size='large'>
            Створити Користувача
          </Button>
        </Link>
        <C.Brick />
        <UsersTable />
      </C.WrapperPage>
    </div>
  )
}
