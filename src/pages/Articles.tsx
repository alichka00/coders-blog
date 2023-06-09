import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'

export const Articles = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Статті' }]} />
      <Divider />
    </div>
  )
}
