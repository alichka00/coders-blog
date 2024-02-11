import { CheckOutlined } from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { App, Button, Flex, Form } from 'antd'

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { GeneralSection } from '../components/GeneralSection'

import { ErrorMessage } from 'components/ErrorMessage'
import { Loader } from 'components/Loader'
import { articlesApi } from 'services/articles'
import { I_Article } from 'services/articles/models/responses'
import * as C from 'styles/components'

export const FormUpdateArticle = () => {
  const [form] = Form.useForm()
  const { notification } = App.useApp()
  const param = useParams()
  const navigate = useNavigate()
  const [articleUpdate, { isSuccess: articleUpdateSuccess }] =
    articlesApi.useUpdateArticleMutation()
  const { data: articleData, isLoading: articleLoading } = articlesApi.useGetArticleQuery(
    Number(param.id),
  )
  const [articleValue, setArticleValue] = useState<string | undefined>('')

  useEffect(() => {
    if (articleData?.data) {
      setArticleValue(articleData.data.content)
      form.setFieldsValue({
        title: articleData.data.title,
        status: articleData.data.status,
        tags: articleData.data.tags?.map((tag) => tag.id) || [],
      })
    }
  }, [articleData, form])

  const handleUpdateArticle = (values: I_Article) => {
    articleUpdate({
      id: Number(param.id),
      title: values.title,
      status: values.status,
      tags: values.tags,
      content: articleValue,
    })
  }

  useEffect(() => {
    if (articleUpdateSuccess) {
      notification.open({
        message: 'Статтю успішно оновлено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/articles/${param.id}`)
    }
  }, [articleUpdateSuccess, navigate, notification, param.id])

  if (articleLoading) return <Loader />

  if (articleData) {
    return (
      <Form form={form} onFinish={handleUpdateArticle}>
        <GeneralSection />
        <C.Brick />
        <MDEditor value={articleValue} onChange={setArticleValue} height={800} />
        <C.Brick />
        <Form.Item>
          <Flex gap='small'>
            <Link to={`/articles/${param.id}`}>
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
