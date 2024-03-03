import { createApi } from '@reduxjs/toolkit/query/react'

import { I_ResponseTags, I_ResponseTag } from './models/responses'

import { baseQueryWithReAuth } from 'services/AuthService'

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['tags', 'tag'],
  endpoints: (builder) => ({
    getTags: builder.query<I_ResponseTags, void>({
      query: () => ({
        url: `tags`,
      }),
      providesTags: ['tags'],
    }),
    getTag: builder.query<I_ResponseTag, number>({
      query: (id) => ({
        url: `tags/${id}`,
      }),
      providesTags: ['tag'],
    }),
    deleteTag: builder.mutation<void, number>({
      query(payload) {
        return {
          url: `tags/${payload}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['tags'],
    }),
    createTag: builder.mutation({
      query(payload) {
        return {
          url: `tags`,
          method: 'POST',
          body: payload,
        }
      },
      invalidatesTags: ['tags'],
    }),
    updateTag: builder.mutation({
      query(payload) {
        return {
          url: `/tags/${payload.id}`,
          method: 'PUT',
          body: payload,
        }
      },
      invalidatesTags: ['tags', 'tag'],
    }),
  }),
})
