import { Link } from 'react-router-dom'
import { useAuthInfo } from '../services/authContext'
import { oAuthLogin } from '../services/authService'

const OAuthButton = () => {
  const { authInfo } = useAuthInfo()

  const onLoginClick = () => {
    oAuthLogin().then(({ data }) => {
      window.location.replace(data)
    })
  }

  return !authInfo.authenticated ? (
    <button onClick={onLoginClick}>Login with Google</button>
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
      <Link className="button" to="/logout">
        Logout
      </Link>
    </div>
  )
}

export default OAuthButton
