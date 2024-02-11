import { CheckOutlined } from '@ant-design/icons'
import { Row, Col, Input, Select, Form, Divider, Space, Button, App } from 'antd'

import { useEffect, useState } from 'react'

import { Loader } from 'components/Loader'
import { tagStatusText } from 'components/TagStatus'
import { tagsApi } from 'services/tags'

export const GeneralSection = () => {
  const { notification } = App.useApp()
  const { data: tagsData, isLoading: tagsLoading } = tagsApi.useGetTagsQuery()
  const [tagCreate, { isSuccess: tagCreateSuccess }] = tagsApi.usePostTagMutation()
  const [tagValue, setTagValue] = useState('')

  const handleTagCreate = () => {
    if (tagsData) {
      tagCreate({
        id: tagsData.data[tagsData.data.length - 1].id + 1,
        name: tagValue,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    setTagValue('')
  }

  useEffect(() => {
    if (tagCreateSuccess) {
      notification.open({
        message: 'Тег успішно створено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
    }
  }, [tagCreateSuccess, notification])

  if (tagsLoading) return <Loader />

  return (
    <Row gutter={16}>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Form.Item name='title' label='Назва' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Form.Item name='status' label='Статус' rules={[{ required: true }]}>
          <Select
            allowClear
            options={Object.entries(tagStatusText).map((item) => {
              return { value: item[0], label: item[1] }
            })}
          />
        </Form.Item>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <Form.Item name='tags' label='Теги' rules={[{ required: true }]}>
          <Select
            mode='multiple'
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider />
                <Space style={{ padding: '0 8px 8px' }}>
                  <Input
                    value={tagValue}
                    onChange={(e) => setTagValue(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type='primary' onClick={() => handleTagCreate()}>
                    Додати
                  </Button>
                </Space>
              </>
            )}
            options={(tagsData?.data || []).map((tag) => {
              return { value: tag.id, label: tag.name }
            })}
          />
        </Form.Item>
      </Col>
    </Row>
  )
}
