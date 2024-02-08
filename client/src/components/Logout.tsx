import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthInfo } from '../services/authContext'
import { logout } from '../services/authService'

const Logout = () => {
  const { setAuthInfo } = useAuthInfo()

  useEffect(() => {
    setAuthInfo(logout())

    // manually reload window to clear Redux session data
    // window.location.reload()
  }, [setAuthInfo])

  return <Navigate replace to="/" />
}

export default Logout
