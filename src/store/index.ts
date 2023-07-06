import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authSlice } from './auth'
import { authApi } from './auth/authApi'
import { sidebarSlice } from './sidebar'

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    sidebarSlice: sidebarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
