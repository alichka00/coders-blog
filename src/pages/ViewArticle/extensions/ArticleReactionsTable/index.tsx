import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Col, Modal, Table, notification } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { useDeleteReactionMutation, useGetArticleQuery } from 'services/articles'
import { formatToDataSource } from 'utils/helpers/table'

export const ArticleReactionsTable = () => {
  const param = useParams()
  const { data, isLoading } = useGetArticleQuery(Number(param.id))
  const [deleteReaction, { isSuccess }] = useDeleteReactionMutation()

  const handleDelete = (reactionId: number, authorId: number) => {
    Modal.confirm({
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
  }, [isSuccess])

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
