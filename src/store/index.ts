import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authSlice } from './auth'
import { sidebarSlice } from './sidebar'

import { adminsApi } from 'services/admins'
import { articlesApi } from 'services/articles'

import { authApi } from 'services/auth'
import { tagsApi } from 'services/tags'
import { usersApi } from 'services/users'

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    sidebarSlice: sidebarSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [adminsApi.reducerPath]: adminsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      articlesApi.middleware,
      tagsApi.middleware,
      adminsApi.middleware,
      usersApi.middleware,
    ),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
