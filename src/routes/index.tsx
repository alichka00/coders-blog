import { Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'

import { Admins } from 'pages/Admins'
import { Articles } from 'pages/Articles'
import { CreateAdmin } from 'pages/CreateAdmin'
import { CreateArticle } from 'pages/CreateArticle'
import { CreateTag } from 'pages/CreateTag'
import { Tags } from 'pages/Tags'
import { UpdateAdminEmail } from 'pages/UpdateAdminEmail'
import { UpdateAdminPassword } from 'pages/UpdateAdminPassword'
import { UpdateArticle } from 'pages/UpdateArticle'
import { UpdateTag } from 'pages/UpdateTag'
import { Users } from 'pages/Users'
import { ViewAdmin } from 'pages/ViewAdmin'
import { ViewArticle } from 'pages/ViewArticle'
import { ViewTag } from 'pages/ViewTag'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/articles' element={<Articles />}></Route>
        <Route path='/articles/:id' element={<ViewArticle />}></Route>
        <Route path='/articles/:id/update' element={<UpdateArticle />}></Route>
        <Route path='/articles/create' element={<CreateArticle />}></Route>
        <Route path='/admins' element={<Admins />}></Route>
        <Route path='/admins/:id' element={<ViewAdmin />}></Route>
        <Route path='/admins/:id/update' element={<UpdateAdminEmail />}></Route>
        <Route path='/admins/create' element={<CreateAdmin />}></Route>
        <Route path='/admins/:id/updatePassword' element={<UpdateAdminPassword />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/tags' element={<Tags />}></Route>
        <Route path='/tags/:id' element={<ViewTag />}></Route>
        <Route path='/tags/:id/update' element={<UpdateTag />}></Route>
        <Route path='/tags/create' element={<CreateTag />}></Route>
      </Route>
      <Route path='*' element={<Navigate to={'/articles'} />} />
    </Routes>
  )
}
