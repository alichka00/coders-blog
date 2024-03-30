import { createApi } from '@reduxjs/toolkit/query/react'

import { I_ResponseAdmin, I_ResponseAdmins } from './models/responses'

import { baseQueryWithReAuth } from 'services/AuthService'

export const adminsApi = createApi({
  reducerPath: 'adminsApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['admins', 'admin'],
  endpoints: (builder) => ({
    getAdmins: builder.query<I_ResponseAdmins, void>({
      query: () => ({
        url: 'admins',
      }),
      providesTags: ['admins'],
    }),
    getAdmin: builder.query<I_ResponseAdmin, number>({
      query: (id) => ({
        url: `admins/${id}`,
      }),
      providesTags: ['admin'],
    }),
    deleteAdmin: builder.mutation<void, number>({
      query(payload) {
        return {
          url: `admins/${payload}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['admins'],
    }),
    createAdmin: builder.mutation({
      query(payload) {
        return {
          url: `admins`,
          method: 'POST',
          body: payload,
        }
      },
      invalidatesTags: ['admins'],
    }),
    updateAdminEmail: builder.mutation({
      query(payload) {
        return {
          url: `/admins/${payload.id}`,
          method: 'PUT',
          body: payload,
        }
      },
      invalidatesTags: ['admins', 'admin'],
    }),
    updateAdminPassword: builder.mutation({
      query(payload) {
        return {
          url: `/admins/changePassword/${payload.id}`,
          method: 'PATCH',
          body: payload,
        }
      },
      invalidatesTags: ['admins', 'admin'],
    }),
  }),
})
