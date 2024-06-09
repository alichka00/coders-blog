import { CheckOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Button, Flex, App, Select } from 'antd'

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { E_UserFrom, T_UserForm } from 'models/user'
import { usersApi } from 'services/users'

export const FormCreateUser = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const [userCreate, { isSuccess: userCreateSuccess }] = usersApi.useCreateUserMutation()

  const handleCreateUser = (values: T_UserForm) => {
    userCreate({
      username: values.username,
      email: values.email,
      avatar: values.avatar,
      from: values.from,
    })
  }

  useEffect(() => {
    if (userCreateSuccess) {
      notification.open({
        message: 'Користувача успішно створено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/users`)
    }
  }, [userCreateSuccess, navigate, notification])

  return (
    <Form form={form} onFinish={handleCreateUser} layout='vertical'>
      <Row gutter={12}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item
            label="Ім'я"
            name='username'
            rules={[{ required: true, message: "Будь ласка введіть ім'я!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
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
            label='Аватар'
            name='avatar'
            rules={[{ required: true, message: 'Будь ласка завантажте аватар!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item
            name='from'
            label='Звідки'
            rules={[
              {
                required: true,
                message: 'Будь ласка вкажіть звідки!',
              },
            ]}
          >
            <Select>
              {[E_UserFrom.GITHUB, E_UserFrom.GITLAB].map((from) => (
                <Select.Option key={from} value={from}>
                  {from}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Flex gap='small'>
          <Link to={`/users`}>
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
