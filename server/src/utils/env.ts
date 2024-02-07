import dotenv from 'dotenv'

dotenv.config()

export const {
  NODE_ENV,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env
