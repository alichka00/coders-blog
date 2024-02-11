import { CheckOutlined } from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { App, Button, Flex, Form } from 'antd'

import { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { GeneralSection } from 'features/FormArticle/components/GeneralSection'

import { articlesApi } from 'services/articles'
import { I_Article } from 'services/articles/models/responses'
import * as C from 'styles/components'

export const FormCreateArticle = () => {
  const [form] = Form.useForm()
  const { notification } = App.useApp()
  const [articleCreate, { isSuccess: articleCreateSuccess }] = articlesApi.usePostArticleMutation()
  const [articleValue, setArticleValue] = useState<string | undefined>('')
  const navigate = useNavigate()
  const param = useParams()

  const handleCreateArticle = (values: I_Article) => {
    articleCreate({
      title: values.title,
      status: values.status,
      tags: values.tags,
      content: articleValue,
      authorId: 1,
    })
  }

  useEffect(() => {
    if (articleCreateSuccess) {
      notification.open({
        message: 'Статтю успішно створено',
        icon: <CheckOutlined style={{ color: '#52C41A' }} />,
      })
      navigate(`/articles`)
    }
  }, [articleCreateSuccess, navigate, notification, param.id])

  return (
    <Form form={form} onFinish={handleCreateArticle}>
      <GeneralSection />
      <C.Brick />
      <MDEditor value={articleValue} onChange={setArticleValue} height={800} />
      <C.Brick />
      <Form.Item>
        <Flex gap='small'>
          <Link to={'/articles'}>
            <Button type='primary' size='large'>
              Скасувати
            </Button>
          </Link>
          <Button type='primary' size='large' htmlType='submit'>
            Створити
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  )
}
