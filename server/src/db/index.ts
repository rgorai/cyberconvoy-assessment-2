import mysql from 'mysql2'
import {
  MYSQL_DATABASE_NAME,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} from '../utils/env'

const db = mysql
  .createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE_NAME,
    decimalNumbers: true,
  })
  .promise()

export default db
