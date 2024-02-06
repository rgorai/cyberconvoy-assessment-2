import mysql from 'mysql2'
import { MYSQL_PASSWORD } from '../utils/env'

const db = mysql
  .createPool({
    host: '127.0.0.1',
    user: 'root',
    password: MYSQL_PASSWORD ?? '',
    database: 'cyberconvoy_assessment_2_ron_gorai',
  })
  .promise()

export default db
