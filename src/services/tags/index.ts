import { createApi } from '@reduxjs/toolkit/query/react'

import { I_ResponseTags } from 'services/articles/models/responses'
import { baseQueryWithReAuth } from 'services/AuthService'

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['tags'],
  endpoints: (builder) => ({
    getTags: builder.query<I_ResponseTags, void>({
      query: () => ({
        url: `tags`,
      }),
      providesTags: ['tags'],
    }),
    postTag: builder.mutation({
      query(payload) {
        return {
          url: `tags`,
          method: 'POST',
          body: payload,
        }
      },
      invalidatesTags: ['tags'],
    }),
  }),
})
