import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { Table, App, Card } from 'antd'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getColumns } from './data'

import { ViewUserModal } from 'components/Modals/ViewUserModal'
import { usersApi } from 'services/users'

export const UsersTable = () => {
  const navigate = useNavigate()
  const [isModalUserOpen, setIsModalUserOpen] = useState(false)
  const [modalUserId, setModalUserId] = useState<number | null>(null)

  const { data: usersData } = usersApi.useGetUsersQuery()
  const [deleteUser, { isSuccess }] = usersApi.useDeleteUserMutation()
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
        deleteUser(id)
      },
    })
  }

  const handleCloseModal = () => {
    setIsModalUserOpen(false)
  }

  const handleOpenModal = (id: number) => {
    setIsModalUserOpen(true)
    setModalUserId(id || null)
  }

  useEffect(() => {
    if (isSuccess) {
      notification.open({
        message: 'Користувач успішно видалений',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/users`)
    }
  }, [isSuccess, navigate, notification])

  if (usersData?.data) {
    return (
      <Card bordered={false} style={{ boxShadow: '0px 0px 13px #0000000d' }}>
        <Table
          columns={getColumns({ handleDelete, handleOpenModal })}
          dataSource={usersData.data.map((item) => ({ ...item, key: item.id }))}
        />
        <ViewUserModal isOpen={isModalUserOpen} handleClose={handleCloseModal} id={modalUserId} />
      </Card>
    )
  }
}
