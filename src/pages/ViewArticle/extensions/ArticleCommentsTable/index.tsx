import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { App, Card, Table } from 'antd'

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { articlesApi } from 'services/articles'
import { formatArticleCommentsToDataSource } from 'utils/helpers/table'

export const ArticleCommentsTable = () => {
  const param = useParams()

  const { data, isLoading } = articlesApi.useGetArticleQuery(Number(param.id))
  const [deleteComment, { isSuccess }] = articlesApi.useDeleteCommentMutation()
  const { modal, notification } = App.useApp()

  const handleDelete = (commentId: number) => {
    modal.confirm({
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
  }, [isSuccess, notification])

  if (isLoading) {
    return <Loader />
  }

  if (data?.data?.ArticleComment) {
    const dataTable = formatArticleCommentsToDataSource(data?.data?.ArticleComment)
    return (
      <Card title='Коментарі' bordered={false} style={{ boxShadow: '0px 0px 13px #0000000d' }}>
        <Table
          columns={getColumns({ onDelete: handleDelete })}
          dataSource={dataTable}
          bordered
          scroll={{ x: 'max-content' }}
        />
      </Card>
    )
  }
  return <ErrorMessage />
}
