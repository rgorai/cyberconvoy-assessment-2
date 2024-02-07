import { Credentials, OAuth2Client } from 'google-auth-library'
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
} from '../utils/env'
import { UserSessionInfo } from '../../types/session'

const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
)

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

export const authorizationUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
  response_type: 'code',
})

export const assignTokens = async (code: string): Promise<Credentials> => {
  const { tokens } = await oAuth2Client.getToken(code)
  oAuth2Client.setCredentials(tokens)
  return tokens
}

export const verifyToken = async (
  idToken: string
): Promise<UserSessionInfo> => {
  const ticket = await oAuth2Client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  return {
    userId: payload?.sub,
    fullName: payload?.name,
    email: payload?.email,
    picture: payload?.picture,
  }
}
