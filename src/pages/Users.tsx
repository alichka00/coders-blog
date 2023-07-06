import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'

export const Users = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Користувачі' }]} />
      <Divider />
    </div>
  )
}
