import { useEffect } from 'react'

import { AppRoutes } from 'routes'
import { useCheckAuthQuery } from 'services/auth'
import { I_Response } from 'services/auth/models/responses'
import { useAppDispatch } from 'store'
import { login } from 'store/auth'

function App() {
  const dispatch = useAppDispatch()
  const { data, isSuccess, isFetching } = useCheckAuthQuery()

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(login(data as I_Response))
    }
  }, [data, isSuccess, dispatch])

  if (isFetching) return null
  return <AppRoutes />
}

export default App
