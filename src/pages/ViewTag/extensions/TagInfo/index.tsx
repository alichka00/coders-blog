import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Row, Col, Statistic, Flex, Button, App, Descriptions, Card } from 'antd'

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getItems } from './data'

import { Loader } from 'components/Loader'

import { tagsApi } from 'services/tags'
import * as C from 'styles/components'

export const TagInfo = () => {
  const param = useParams()
  const navigate = useNavigate()
  const { data: dataTag, isLoading } = tagsApi.useGetTagQuery(Number(param.id))
  const [deleteTag, { isSuccess }] = tagsApi.useDeleteTagMutation()
  const { notification, modal } = App.useApp()

  const handleDelete = () => {
    modal.confirm({
      title: 'Видалення',
      icon: <ExclamationCircleOutlined />,
      content: 'Тег буде видалено',
      okText: 'Видалити',
      cancelText: 'Скасувати',
      maskClosable: true,
      onOk: () => {
        deleteTag(Number(param.id))
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      notification.open({
        message: 'Тег успішно видалено',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/tags`)
    }
  }, [isSuccess, navigate, notification])

  if (isLoading) {
    return <Loader />
  }

  if (dataTag?.data) {
    return (
      <>
        {/* <Row gutter={[16, 4]}>
          <Col xs={24} lg={12} xl={8}>
            <Statistic valueStyle={{ fontSize: '18px' }} title='Назва' value={dataTag.data.name} />
          </Col>
          <Col xs={24} lg={12} xl={8}>
            <Statistic
              title='Іконка'
              value={dataTag.data.icon}
              formatter={(value) =>
                value ? <i style={{ fontSize: 32 }} className={String(value)} /> : '-'
              }
            />
          </Col>
          <Col xs={24} lg={12} xl={8}>
            <Statistic
              valueStyle={{ fontSize: '18px' }}
              title='Опис'
              value={dataTag.data.description}
            />
          </Col>
        </Row> */}
        <Card
          title='Загальна інформація'
          bordered={false}
          style={{ boxShadow: '0px 0px 13px #0000000d' }}
        >
          <Descriptions items={getItems(dataTag.data)} layout='vertical' />
        </Card>
        <C.Brick />
        <Flex gap='small'>
          <Link to='update'>
            <Button type='primary' size='large'>
              Редагувати
            </Button>
          </Link>
          <Button type='primary' size='large' onClick={handleDelete}>
            Видалити
          </Button>
        </Flex>
      </>
    )
  }
}
