import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, App, Descriptions, Card } from 'antd'

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getItems } from './data'

import { Loader } from 'components/Loader'

import { adminsApi } from 'services/admins'

export const AdminInfo = () => {
  const param = useParams()
  const navigate = useNavigate()
  const { data: dataAdmin, isLoading } = adminsApi.useGetAdminQuery(Number(param.id))
  const [deleteAdmin, { isSuccess }] = adminsApi.useDeleteAdminMutation()
  const { notification, modal } = App.useApp()

  const handleDelete = () => {
    modal.confirm({
      title: 'Видалення',
      icon: <ExclamationCircleOutlined />,
      content: 'Адміністратора буде видалено',
      okText: 'Видалити',
      cancelText: 'Скасувати',
      maskClosable: true,
      onOk: () => {
        deleteAdmin(Number(param.id))
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      notification.open({
        message: 'Адміністратор успішно видалений',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/admins`)
    }
  }, [isSuccess, navigate, notification])

  if (isLoading) {
    return <Loader />
  }

  if (dataAdmin?.data) {
    return (
      <Card bordered={false} style={{ boxShadow: '0px 0px 13px #0000000d' }}>
        <Descriptions
          items={getItems({ ...dataAdmin.data, key: dataAdmin.data.id })}
          layout='vertical'
          extra={
            <Button onClick={handleDelete} type='primary'>
              Видалити
            </Button>
          }
        />
      </Card>
    )
  }
}
