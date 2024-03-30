import { CheckOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Button, Flex, App } from 'antd'

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { T_AdminForm } from 'models/admin'

import { adminsApi } from 'services/admins'

export const FormCreateAdmin = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const [adminCreate, { isSuccess: adminCreateSuccess }] = adminsApi.useCreateAdminMutation()

  const handleCreateAdmin = (values: T_AdminForm) => {
    adminCreate({
      email: values.email,
      password: values.password,
      confirm: values.confirm,
    })
  }

  useEffect(() => {
    if (adminCreateSuccess) {
      notification.open({
        message: 'Адміністратора успішно створено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/admins`)
    }
  }, [adminCreateSuccess, navigate, notification])

  return (
    <Form form={form} onFinish={handleCreateAdmin} layout='vertical'>
      <Row gutter={12}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item
            label='Пошта'
            name='email'
            rules={[{ required: true, message: 'Будь ласка введіть пошту!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
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
          <Link to={`/admins`}>
            <Button type='primary' size='large'>
              Скасувати
            </Button>
          </Link>
          <Button type='primary' size='large' htmlType='submit'>
            Створити
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  )
}
