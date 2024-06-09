import { CheckOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Button, Flex, App, Select } from 'antd'

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'

import { E_UserFrom, T_UserForm } from 'models/user'
import { usersApi } from 'services/users'

export const FormUpdateUser = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const param = useParams()
  const { data: dataUser, isLoading: userLoading } = usersApi.useGetUserQuery(Number(param.id))
  const [updateUser, { isSuccess: updateUserSuccess }] = usersApi.useUpdateUserMutation()

  useEffect(() => {
    if (dataUser?.data) {
      form.setFieldsValue({
        username: dataUser?.data.username,
        email: dataUser?.data.email,
        avatar: dataUser?.data.avatar,
        from: dataUser?.data.from,
      })
    }
  }, [dataUser, form])

  const handleUpdateUser = (values: T_UserForm) => {
    updateUser({
      id: Number(param.id),
      username: values.username,
      email: values.email,
      avatar: values.avatar,
      from: values.from,
    })
  }

  useEffect(() => {
    if (updateUserSuccess) {
      notification.open({
        message: 'Користувача успішно оновлено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/users`)
    }
  }, [updateUserSuccess, navigate, notification, param.id])

  if (userLoading) return <Loader />

  if (dataUser?.data) {
    return (
      <Form form={form} onFinish={handleUpdateUser}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Ім'я" name='username'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label='Пошта' name='email'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label='Аватар' name='avatar'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label='Звідки' name='from'>
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
              Зберегти
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    )
  }
  return <ErrorMessage />
}
