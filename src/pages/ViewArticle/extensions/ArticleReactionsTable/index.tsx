import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Col, Table, App } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { articlesApi } from 'services/articles'
import { formatToDataSource } from 'utils/helpers/table'

export const ArticleReactionsTable = () => {
  const param = useParams()
  const { data, isLoading } = articlesApi.useGetArticleQuery(Number(param.id))
  const [deleteReaction, { isSuccess }] = articlesApi.useDeleteReactionMutation()
  const { notification, modal } = App.useApp()

  const handleDelete = (reactionId: number, authorId: number) => {
    modal.confirm({
      title: 'Видалення',
      icon: <ExclamationCircleOutlined />,
      content: 'Реакцію буде видалено',
      okText: 'Видалити',
      cancelText: 'Скасувати',
      maskClosable: true,
      onOk: () => {
        deleteReaction({ reactionId, authorId })
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      notification.open({
        message: 'Реакцію успішно видалено',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isSuccess, notification])

  if (isLoading) {
    return <Loader />
  }

  if (data?.data?.ArticleReaction) {
    return (
      <>
        {data.data.ArticleReaction.map((item) => {
          if (item.authors) {
            const dataTable = formatToDataSource(item.authors)
            const onDelete = (authorId: number) => {
              handleDelete(item.id, authorId)
            }
            return (
              <Col xs={24} lg={12} xl={6} key={item.id}>
                <h4>
                  {item.reaction?.icon} ({item.counter})
                </h4>
                <Table columns={getColumns({ onDelete })} dataSource={dataTable} bordered />
              </Col>
            )
          }
        })}
      </>
    )
  }
  return <ErrorMessage />
}
