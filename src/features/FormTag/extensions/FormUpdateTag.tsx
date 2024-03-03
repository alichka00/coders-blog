import { CheckOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Button, Flex, App } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { I_Tag } from 'models/tags'

import { tagsApi } from 'services/tags'

export const FormUpdateTag = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const param = useParams()
  const { data: dataTag, isLoading: tagLoading } = tagsApi.useGetTagQuery(Number(param.id))
  const [updateTag, { isSuccess: tagUpdateSuccess }] = tagsApi.useUpdateTagMutation()

  useEffect(() => {
    if (dataTag?.data) {
      form.setFieldsValue({
        name: dataTag?.data.name,
        icon: dataTag?.data.icon,
        description: dataTag?.data.description,
      })
    }
  }, [dataTag, form])

  const handleUpdateTag = (values: I_Tag) => {
    updateTag({
      id: Number(param.id),
      name: values.name,
      icon: values.icon,
      description: values.description,
    })
  }

  useEffect(() => {
    if (tagUpdateSuccess) {
      notification.open({
        message: 'Тег успішно оновлено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/tags/${param.id}`)
    }
  }, [tagUpdateSuccess, navigate, notification, param.id])

  if (tagLoading) return <Loader />

  if (dataTag?.data) {
    return (
      <Form form={form} onFinish={handleUpdateTag}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label='Назва' name='name'>
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
            <Link to={`/tags/${param.id}`}>
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
