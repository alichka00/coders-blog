import { createApi } from '@reduxjs/toolkit/query/react'

import { I_ResponseUser, I_ResponseUsers } from './models/responses'

import { baseQueryWithReAuth } from 'services/AuthService'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['users', 'user'],
  endpoints: (builder) => ({
    getUsers: builder.query<I_ResponseUsers, void>({
      query: () => ({
        url: 'users',
      }),
      providesTags: ['users'],
    }),
    getUser: builder.query<I_ResponseUser, number>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: ['user'],
    }),
    deleteUser: builder.mutation<void, number>({
      query(payload) {
        return {
          url: `users/${payload}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['users'],
    }),
    createUser: builder.mutation({
      query(payload) {
        return {
          url: `users`,
          method: 'POST',
          body: payload,
        }
      },
      invalidatesTags: ['users'],
    }),
    updateUser: builder.mutation({
      query(payload) {
        return {
          url: `/users/${payload.id}`,
          method: 'PUT',
          body: payload,
        }
      },
      invalidatesTags: ['users', 'user'],
    }),
  }),
})
