import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { Button, Col, Row, App, Flex, Card, Descriptions } from 'antd'

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getItems } from './data'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'

import { articlesApi } from 'services/articles'
import * as C from 'styles/components'

export const ArticleInfo = () => {
  const param = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = articlesApi.useGetArticleQuery(Number(param.id))
  const [deleteArticle, { isSuccess }] = articlesApi.useDeleteArticleMutation()
  const { notification, modal } = App.useApp()

  const handleDelete = () => {
    modal.confirm({
      title: 'Видалення',
      icon: <ExclamationCircleOutlined />,
      content: 'Статтю буде видалено',
      okText: 'Видалити',
      cancelText: 'Скасувати',
      maskClosable: true,
      onOk: () => {
        deleteArticle(Number(param.id))
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      notification.open({
        message: 'Статтю успішно видалено',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/articles`)
    }
  }, [isSuccess, navigate, notification])

  if (isLoading) {
    return <Loader />
  }

  if (data?.data) {
    return (
      <>
        <Card
          title='Загальна інформація'
          bordered={false}
          style={{ boxShadow: '0px 0px 13px #0000000d' }}
        >
          <Descriptions items={getItems(data.data)} layout='vertical' />
        </Card>
        <C.Brick />
        <Card bordered={false} style={{ boxShadow: '0px 0px 13px #0000000d' }}>
          <Row>
            <Col xs={24} xxl={16}>
              <MDEditor hideToolbar preview='preview' height={800} value={data.data.content} />
            </Col>
          </Row>
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
  return <ErrorMessage />
}
