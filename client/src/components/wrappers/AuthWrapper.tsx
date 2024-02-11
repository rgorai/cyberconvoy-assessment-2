import { PropsWithChildren, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthInfo } from '../../services/authContext'
import { authenticateUser, logout } from '../../services/authService'

type Props = {
  ensureNotAuthenticated: boolean | null
}

const AuthWrapper = (props: Props & PropsWithChildren) => {
  const { authInfo, setAuthInfo } = useAuthInfo()
  const { pathname, search, state } = useLocation()

  // check if user is authenticated
  useEffect(() => {
    authenticateUser()
      .then(({ data }) => setAuthInfo({ authenticated: true, user: data }))
      .catch(() => setAuthInfo(logout()))
  }, [setAuthInfo])

  return props.ensureNotAuthenticated === authInfo.authenticated ? (
    props.ensureNotAuthenticated ? (
      <Navigate replace to={state?.from ?? '/employees'} />
    ) : (
      <Navigate replace to="/" state={{ from: pathname + search }} />
    )
  ) : (
    <Outlet />
  )
}

export default AuthWrapper
