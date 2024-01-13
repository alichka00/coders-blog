import { createApi } from '@reduxjs/toolkit/query/react'

import { I_ArticlesData } from './models/articleData'

import {
  I_ResponseArticle,
  I_ResponseArticles,
  T_ArticleId,
} from 'services/articles/models/responses'
import { baseQuery } from 'services/AuthService'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: baseQuery,
  tagTypes: ['articles', 'article'],
  endpoints: (builder) => ({
    getArticles: builder.query<I_ResponseArticles, I_ArticlesData>({
      query: ({ page, limit, sort, filter }) => {
        let url = `articles?page=${page}&limit=${limit}`

        if (Array.isArray(sort) && sort.length > 0) {
          sort.forEach((sortValue) => {
            url += `&sort=${sortValue}`
            console.log('sort', sort)
          })
        }

        if (Array.isArray(filter) && filter.length > 0) {
          filter.forEach((filterValue) => {
            url += `&filter=${filterValue}`
          })
        }
        return {
          url,
        }
      },
      providesTags: ['articles'],
    }),
    getArticle: builder.query<I_ResponseArticle, T_ArticleId>({
      query: (id) => ({
        url: `articles/${id}`,
      }),
      providesTags: ['articles', 'article'],
    }),
    updateArticle: builder.mutation({
      query(payload) {
        return {
          url: `articles/${payload.id}`,
          method: 'PUT',
          body: payload,
        }
      },
    }),
    deleteArticle: builder.mutation({
      query(id) {
        return {
          url: `articles/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['articles'],
    }),
    deleteComment: builder.mutation({
      query(id) {
        return {
          url: `comments/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['articles', 'article'],
    }),
    deleteReaction: builder.mutation({
      query({ reactionId, authorId }) {
        return {
          url: `reactions/${reactionId}/${authorId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['articles', 'article'],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useDeleteCommentMutation,
  useDeleteReactionMutation,
} = articlesApi
