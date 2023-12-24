import { createApi } from '@reduxjs/toolkit/query/react'

import { I_LoginData } from './models/loginData'
import { I_AuthResponse } from './models/responses'

import { baseQueryWithReAuth } from 'services/AuthService'

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
