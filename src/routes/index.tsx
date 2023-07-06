import { Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'

import { Admins } from 'pages/Admins'
import { Articles } from 'pages/Articles'
import { Users } from 'pages/Users'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/articles' element={<Articles />}></Route>
        <Route path='/admins' element={<Admins />}></Route>
        <Route path='/users' element={<Users />}></Route>
      </Route>
      <Route path='*' element={<Navigate to={'/articles'} />} />
    </Routes>
  )
}
