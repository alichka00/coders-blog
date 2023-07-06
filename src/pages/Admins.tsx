import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'

export const Admins = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Адміністратори' }]} />
      <Divider />
    </div>
  )
}
