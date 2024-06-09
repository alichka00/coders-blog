import { Descriptions, Modal, Space } from 'antd'

import * as S from './styles'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { usersApi } from 'services/users'
import { formatDate } from 'utils/helpers/formatDate'

interface I_ViewUserModalProps {
  isOpen: boolean
  handleClose: () => void
  id: number | null
}

export const ViewUserModal = ({ isOpen, handleClose, id }: I_ViewUserModalProps) => {
  const { data: dataUser, isLoading } = usersApi.useGetUserQuery(id!)

  return (
    <Modal open={isOpen} footer={null} onCancel={handleClose}>
      {isLoading ? (
        <Loader />
      ) : dataUser?.data ? (
        <S.Wrapper>
          <Space>
            <S.UserAvatar src={dataUser?.data.avatar} shape='square' />
          </Space>
          <Descriptions title='Інформація про користувача' layout='vertical'>
            <Descriptions.Item label="Ім'я">{dataUser?.data.username}</Descriptions.Item>
            <Descriptions.Item label='Пошта'>{dataUser?.data.email}</Descriptions.Item>
            <Descriptions.Item label='Звідки'>{dataUser?.data.from}</Descriptions.Item>
            <Descriptions.Item label='Дата створення'>
              {formatDate(dataUser?.data.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label='Дата оновлення'>
              {formatDate(dataUser?.data.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
        </S.Wrapper>
      ) : (
        <ErrorMessage />
      )}
    </Modal>
  )
}
