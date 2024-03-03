import { CheckOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Button, Flex, App } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { I_Tag } from 'models/tags'

import { tagsApi } from 'services/tags'

export const FormCreateTag = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const [tagCreate, { isSuccess: tagCreateSuccess }] = tagsApi.useCreateTagMutation()

  const handleCreateTag = (values: I_Tag) => {
    tagCreate({
      name: values.name,
      icon: values.icon,
      description: values.description,
    })
  }

  useEffect(() => {
    if (tagCreateSuccess) {
      notification.open({
        message: 'Тег успішно створено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/tags`)
    }
  }, [tagCreateSuccess, navigate, notification])

  return (
    <Form form={form} onFinish={handleCreateTag}>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label='Назва' name='name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Іконка' name='icon'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='Опис' name='description'>
            <TextArea rows={6} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Flex gap='small'>
          <Link to={`/tags`}>
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
