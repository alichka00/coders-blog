import { Card, Table } from 'antd'

import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { tagsApi } from 'services/tags'

export const ArticleTable = () => {
  const param = useParams()
  const { data: dataTag } = tagsApi.useGetTagQuery(Number(param.id))

  const data = dataTag?.data.articles?.map((item) => ({
    ...item,
    key: item.id,
  }))

  if (dataTag?.data) {
    return (
      <Card bordered={false} style={{ boxShadow: '0px 0px 13px #0000000d' }}>
        <Table columns={getColumns()} dataSource={data} scroll={{ x: 'max-content' }} />
      </Card>
    )
  }
}
