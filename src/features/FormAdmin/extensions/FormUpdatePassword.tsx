import { CheckOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Button, Flex, App } from 'antd'

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { T_AdminForm } from 'models/admin'

import { adminsApi } from 'services/admins'

export const FormUpdatePassword = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const param = useParams()
  const [updateAdminPassword, { isSuccess: updateAdminPasswordSuccess }] =
    adminsApi.useUpdateAdminPasswordMutation()

  const handleUpdateAdminPassword = (values: T_AdminForm) => {
    updateAdminPassword({
      id: Number(param.id),
      password: values.password,
      confirm: values.confirm,
    })
  }

  useEffect(() => {
    if (updateAdminPasswordSuccess) {
      notification.open({
        message: 'Пароль успішно оновлено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/admins/${param.id}`)
    }
  }, [updateAdminPasswordSuccess, navigate, notification, param.id])

  return (
    <Form form={form} onFinish={handleUpdateAdminPassword} layout='vertical'>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label='Введіть пароль'
            name='password'
            rules={[{ required: true, message: 'Будь ласка введіть пароль!' }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name='confirm'
            label='Підтвердьте пароль'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Будь ласка підтвердьте пароль!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Паролі не збігаються!'))
                },
              }),
            ]}
          >
            <Input.Password />
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
