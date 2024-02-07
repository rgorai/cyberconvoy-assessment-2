import { oAuthLogin } from '../services/authService'

const OAuthButton = () => {
  const onLoginClick = () => {
    console.log('logging in')

    oAuthLogin()
      .then(({ data }) => {
        console.log('oauth data', data)
        // navigate(data)
        window.location.replace(data)
      })
      .catch(({ response }) => {
        console.error('get oauth screen error', response)
      })
  }

  return <button onClick={onLoginClick}>login with google</button>
}

export default OAuthButton
