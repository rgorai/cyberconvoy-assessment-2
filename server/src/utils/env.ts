import dotenv from 'dotenv'

dotenv.config()

export const { NODE_ENV, MYSQL_PASSWORD } = process.env
