import { Card } from 'antd'
import Table from 'antd/es/table'

import { getColumns } from './data'

import { tagsApi } from 'services/tags'

export const TagsTable = () => {
  const { data } = tagsApi.useGetTagsQuery()

  const dataTags = (data?.data || []).map((item) => ({
    ...item,
    key: item.id,
  }))

  if (data?.data) {
    return (
      <Card bordered={false} style={{ boxShadow: '0px 0px 13px #0000000d' }}>
        <Table
          columns={getColumns()}
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
            rowExpandable: (record) => record.description !== null,
          }}
          dataSource={dataTags}
        />
      </Card>
    )
  }
}
