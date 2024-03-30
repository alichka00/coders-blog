import { CheckOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Button, Flex, App } from 'antd'

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'

import { T_AdminForm } from 'models/admin'
import { adminsApi } from 'services/admins'

export const FormUpdateEmail = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const param = useParams()
  const { data: dataAdmin, isLoading: adminLoading } = adminsApi.useGetAdminQuery(Number(param.id))
  const [updateAdminEmail, { isSuccess: updateAdminEmailSuccess }] =
    adminsApi.useUpdateAdminEmailMutation()

  useEffect(() => {
    if (dataAdmin?.data) {
      form.setFieldsValue({
        email: dataAdmin?.data.email,
      })
    }
  }, [dataAdmin, form])

  const handleUpdateAdminEmail = (values: T_AdminForm) => {
    updateAdminEmail({
      id: Number(param.id),
      email: values.email,
    })
  }

  useEffect(() => {
    if (updateAdminEmailSuccess) {
      notification.open({
        message: 'Пошту успішно оновлено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/admins/${param.id}`)
    }
  }, [updateAdminEmailSuccess, navigate, notification, param.id])

  if (adminLoading) return <Loader />

  if (dataAdmin?.data) {
    return (
      <Form form={form} onFinish={handleUpdateAdminEmail}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label='Пошта' name='email'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Flex gap='small'>
            <Link to={`/admins/${param.id}`}>
              <Button type='primary' size='large'>
                Скасувати
              </Button>
            </Link>
            <Button type='primary' size='large' htmlType='submit'>
              Зберегти
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    )
  }
  return <ErrorMessage />
}
