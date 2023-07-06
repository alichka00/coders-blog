import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { I_Response } from 'store/auth/models/responses'
import { LocalStorage } from 'utils/localStorage'

interface I_AuthState {
  isAuth: boolean
  email: string | undefined
}

export const initialState: I_AuthState = {
  isAuth: false,
  email: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<I_Response>) {
      if (action.payload.data) {
        state.isAuth = true
        state.email = action.payload.data.admin.email
        if (action.payload.data.accessToken) {
          LocalStorage.setAccessToken(action.payload.data.accessToken)
        }
        if (action.payload.data.refreshToken) {
          LocalStorage.setRefreshToken(action.payload.data.refreshToken)
        }
      }
    },
    logout(state) {
      LocalStorage.removeAccessToken()
      LocalStorage.removeRefreshToken()
      state.isAuth = false
      state.email = ''
    },
  },
})
export default authSlice.reducer
export const { logout, login } = authSlice.actions
