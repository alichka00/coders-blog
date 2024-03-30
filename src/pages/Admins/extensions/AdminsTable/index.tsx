import { Table } from 'antd'

import { getColumns } from './data'

import { adminsApi } from 'services/admins'

export const AdminsTable = () => {
  const { data: adminsData } = adminsApi.useGetAdminsQuery()

  if (adminsData?.data) {
    return (
      <Table
        columns={getColumns()}
        dataSource={adminsData.data.map((item) => ({ ...item, key: item.id }))}
      />
    )
  }
}
