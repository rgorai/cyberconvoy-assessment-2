import 'express-session'
import { Credentials } from 'google-auth-library'

type UserSessionInfo = {
  userId?: string
  fullName?: string
  email?: string
  picture?: string
}

declare module 'express-session' {
  interface SessionData {
    user?: UserSessionInfo
    tokens?: Credentials
  }
}
