import axios from 'axios'

export const oAuthLogin = () => axios.get('/api/oauth/login')

export const authenticateUser = () =>
  axios.get<UserInfo>('/api/oauth/isAuthenticated')

export const logout = (): Unauthenticated => {
  axios.get('/api/oauth/logout')
  return { authenticated: false }
}
