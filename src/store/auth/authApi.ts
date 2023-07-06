import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from 'services/AuthService'
import { I_LoginData } from 'store/auth/models/loginData'
import { I_AuthResponse } from 'store/auth/models/responses'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    signIn: builder.mutation<I_AuthResponse, I_LoginData>({
      query: (payload) => ({
        url: '/auth/signin',
        method: 'POST',
        body: payload,
      }),
    }),
    checkAuth: builder.query<I_AuthResponse, void>({
      query: () => ({
        url: '/auth/check',
      }),
    }),
  }),
})

export const { useSignInMutation, useCheckAuthQuery } = authApi
