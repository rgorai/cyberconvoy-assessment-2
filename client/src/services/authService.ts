import axios from 'axios'

export const oAuthLogin = () => axios.get('/api/oauth/login')
