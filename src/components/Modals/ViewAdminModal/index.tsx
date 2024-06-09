import { EditOutlined } from '@ant-design/icons'
import { Button, Descriptions, Modal } from 'antd'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { adminsApi } from 'services/admins'
import { formatDate } from 'utils/helpers/formatDate'

interface I_ViewAdminModalProps {
  isOpen: boolean
  handleClose: () => void
  id: number | null
}

export const ViewAdminModal = ({ isOpen, handleClose, id }: I_ViewAdminModalProps) => {
  const { data: dataAdmin, isLoading } = adminsApi.useGetAdminQuery(id!)

  return (
    <Modal open={isOpen} footer={null} onCancel={handleClose}>
      {isLoading ? (
        <Loader />
      ) : dataAdmin?.data ? (
        <Descriptions title='Інформація про адміністратора' layout='vertical'>
          <Descriptions.Item label='Пошта'>
            {dataAdmin.data.email}
            <Link to={`/admins/${dataAdmin.data.id}/update`}>
              <Button type='text' icon={<EditOutlined />} />
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label='Пароль'>
            <span>••••••••••</span>
            <Link to={`/admins/${dataAdmin.data.id}/updatePassword`}>
              <Button type='text' icon={<EditOutlined />} />
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label='Дата створення'>
            {formatDate(dataAdmin.data.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label='Дата оновлення'>
            {formatDate(dataAdmin.data.updatedAt)}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <ErrorMessage />
      )}
    </Modal>
  )
}
