import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { T_Tokens } from 'models/shared/tokens'

import { logout } from 'store/auth'
import { LocalStorage } from 'utils/helpers/localStorage'

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_API}`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = LocalStorage.getAccessToken()
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = LocalStorage.getRefreshToken()
    const refreshResult = await fetch(`http://localhost:3001/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    const response = await refreshResult.json()

    if (response.data) {
      const accessToken = (response?.data as T_Tokens).accessToken
      const refreshToken = (response?.data as T_Tokens).refreshToken

      LocalStorage.setAccessToken(accessToken)
      LocalStorage.setRefreshToken(refreshToken)

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}
