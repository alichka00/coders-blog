import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { App, Card, Table } from 'antd'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getColumns } from './data'

import { ViewAdminModal } from 'components/Modals/ViewAdminModal'
import { adminsApi } from 'services/admins'

export const AdminsTable = () => {
  const { data: adminsData } = adminsApi.useGetAdminsQuery()
  const navigate = useNavigate()
  const [isModalAdminOpen, setIsModalAdminOpen] = useState(false)
  const [modalAdminId, setModalAdminId] = useState<number | null>(null)
  const [deleteAdmin, { isSuccess }] = adminsApi.useDeleteAdminMutation()
  const { notification, modal } = App.useApp()

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Видалення',
      icon: <ExclamationCircleOutlined />,
      content: 'Користувача буде видалено',
      okText: 'Видалити',
      cancelText: 'Скасувати',
      maskClosable: true,
      onOk: () => {
        deleteAdmin(id)
      },
    })
  }

  const handleCloseModal = () => {
    setIsModalAdminOpen(false)
  }

  const handleOpenModal = (id: number) => {
    setIsModalAdminOpen(true)
    setModalAdminId(id || null)
  }

  useEffect(() => {
    if (isSuccess) {
      notification.open({
        message: 'Користувач успішно видалений',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/admins`)
    }
  }, [isSuccess, navigate, notification])

  if (adminsData?.data) {
    return (
      <Card bordered={false} style={{ boxShadow: '0px 0px 13px #0000000d' }}>
        <Table
          columns={getColumns({ handleDelete, handleOpenModal })}
          dataSource={adminsData.data.map((item) => ({ ...item, key: item.id }))}
        />

        <ViewAdminModal
          isOpen={isModalAdminOpen}
          handleClose={handleCloseModal}
          id={modalAdminId}
        />
      </Card>
    )
  }
}
