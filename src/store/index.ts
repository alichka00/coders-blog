import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authSlice } from './auth'
import { sidebarSlice } from './sidebar'

import { articlesApi } from '../services/articles'

import { authApi } from 'services/auth'

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    sidebarSlice: sidebarSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, articlesApi.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
