import dotenv from 'dotenv'

dotenv.config()

export const {
  NODE_ENV,
  MYSQL_HOST = '127.0.0.1',
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE = 'cyberconvoy_assessment_2_ron_gorai',
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL = 'http://localhost:3001/api/oauth/callback',
  EXPRESS_SESSION_SECRET,
} = process.env
