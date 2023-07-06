import { Outlet } from 'react-router-dom'

import { Auth } from 'layouts/Auth'
import { Dashboard } from 'layouts/Dashboard'
import { useAppSelector } from 'store'

export const ProtectedRoute = () => {
  const { isAuth } = useAppSelector((state) => state.authSlice)

  if (isAuth) {
    return (
      <>
        <Dashboard>
          <Outlet />
        </Dashboard>
      </>
    )
  }
  return <Auth />
}
