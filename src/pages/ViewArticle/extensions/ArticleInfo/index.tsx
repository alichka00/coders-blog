import {
  CalendarOutlined,
  CheckOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { Button, Col, Row, Statistic, Tag, Typography, App, Flex } from 'antd'

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { tagStatusText } from 'components/TagStatus'

import { articlesApi } from 'services/articles'
import * as C from 'styles/components'
import { formatDate } from 'utils/helpers/date'

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
        <Row gutter={[16, 4]}>
          <Col xs={24} lg={12} xl={12}>
            <Statistic title='Назва' value={data.data.title} />
          </Col>
        </Row>
        <C.Brick />
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title='Статус'
              value={tagStatusText[data.data.status]}
              prefix={<CheckOutlined />}
            />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Statistic title='Автор' value={data.data.author.username} prefix={<UserOutlined />} />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title='Коментарі'
              value={data.data._count?.ArticleComment}
              prefix={<CommentOutlined />}
            />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Statistic title='Перегляди' value={data.data.views} prefix={<EyeOutlined />} />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title='Дата створення'
              value={formatDate(data.data.createdAt)}
              prefix={<CalendarOutlined />}
            />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title='Дата оновлення'
              value={formatDate(data.data.updatedAt)}
              prefix={<CalendarOutlined />}
            />
          </Col>
        </Row>
        <C.Brick />
        {data.data.tags && (
          <>
            <Typography.Text type='secondary'>Теги</Typography.Text>
            <C.Brick h={8} md={4} />
            <Row>
              <Col xs={24}>
                {data.data.tags.map((tag) => (
                  <Tag key={tag.id}>{tag.name}</Tag>
                ))}
              </Col>
            </Row>
            <C.Brick />
          </>
        )}
        <Row>
          <Col xs={24} xxl={16}>
            <MDEditor hideToolbar preview='preview' height={800} value={data.data.content} />
          </Col>
        </Row>
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
