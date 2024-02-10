import { useAuthInfo } from '../services/authContext'
import { logout, oAuthLogin } from '../services/authService'

const OAuthButton = () => {
  const { authInfo, setAuthInfo } = useAuthInfo()

  const onLoginClick = () => {
    oAuthLogin().then(({ data }) => {
      window.location.replace(data)
    })
  }

  const onLogoutClick = () => {
    setAuthInfo(logout())
  }

  return !authInfo.authenticated ? (
    <button className="btn primary" onClick={onLoginClick}>
      Login with Google
    </button>
  ) : (
    <div className="flex flex-row items-center gap-7">
      <div className="flex flex-row items-center gap-3">
        {authInfo.user.picture && (
          <img
            className="w-9 rounded-full"
            src={authInfo.user.picture}
            alt="Profile Picture"
          />
        )}
        {authInfo.user.fullName ?? 'User'}
      </div>
      <button className="btn primary" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  )
}

export default OAuthButton
