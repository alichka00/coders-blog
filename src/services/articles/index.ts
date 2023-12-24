import { createApi } from '@reduxjs/toolkit/query/react'

import { I_ArticlesData } from './models/articleData'

import { I_Response } from 'services/articles/models/responses'
import { baseQuery } from 'services/AuthService'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getArticles: builder.query<I_Response, I_ArticlesData>({
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
    }),
  }),
})

export const { useGetArticlesQuery } = articlesApi
