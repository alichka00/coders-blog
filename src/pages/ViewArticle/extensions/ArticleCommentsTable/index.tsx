import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Table, notification } from 'antd'

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { useDeleteCommentMutation, useGetArticleQuery } from 'services/articles'
import { formatArticleCommentsToDataSource } from 'utils/helpers/table'

export const ArticleCommentsTable = () => {
  const param = useParams()

  const { data, isLoading } = useGetArticleQuery(Number(param.id))
  const [deleteComment, { isSuccess }] = useDeleteCommentMutation()

  const handleDelete = (commentId: number) => {
    Modal.confirm({
      title: 'Видалення',
      icon: <ExclamationCircleOutlined />,
      content: 'Коментар буде видалено',
      okText: 'Видалити',
      cancelText: 'Скасувати',
      maskClosable: true,
      onOk: () => {
        deleteComment(commentId)
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      notification.open({
        message: 'Коментар успішно видалено',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isSuccess])

  if (isLoading) {
    return <Loader />
  }

  if (data?.data?.ArticleComment) {
    const dataTable = formatArticleCommentsToDataSource(data?.data?.ArticleComment)
    return (
      <Table columns={getColumns({ onDelete: handleDelete })} dataSource={dataTable} bordered />
    )
  }
  return <ErrorMessage />
}
