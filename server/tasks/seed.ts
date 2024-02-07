import mysql from 'mysql2'
import { MYSQL_PASSWORD, NODE_ENV } from '../src/utils/env'
import { departmentsList, employeesList } from './seedData'

const db = mysql
  .createPool({
    host: '127.0.0.1',
    user: 'root',
    password: MYSQL_PASSWORD ?? '',
  })
  .promise()

const seedDb = async () => {
  // drop db before seeding
  console.log('Dropping db if it exists...')
  await db.query('DROP DATABASE IF EXISTS cyberconvoy_assessment_2_ron_gorai')

  // create db
  console.log('Creating db...')
  await db.query('CREATE DATABASE cyberconvoy_assessment_2_ron_gorai')
  await db.query('USE cyberconvoy_assessment_2_ron_gorai')

  // DEPARTMENTS
  console.log('Creating departments table...')
  await db.query(
    `CREATE TABLE departments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )`
  )

  console.log('Inserting departments data...')
  await db.query(`INSERT INTO departments (name) VALUES ?`, [
    departmentsList.map((department) => [department]),
  ])

  // EMPLOYEES
  console.log('Creating employees table...')
  await db.query(
    `CREATE TABLE employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      department_id INT,
      FOREIGN KEY (department_id) REFERENCES departments(id),
      title VARCHAR(255) NOT NULL,
      salary DECIMAL NOT NULL
    )`
  )

  console.log('Inserting employees data...')
  await db.query(
    `INSERT INTO employees (
      first_name, 
      last_name, 
      date_of_birth, 
      department_id, 
      title, 
      salary
    ) VALUES ?`,
    [
      employeesList.map((employee) => [
        employee.first_name,
        employee.last_name,
        employee.date_of_birth,
        employee.department_id,
        employee.title,
        employee.salary,
      ]),
    ]
  )

  // complete seeding
  db.end()
  console.log('Seeding complete')
}

if (NODE_ENV !== 'production')
  seedDb().catch((err) => {
    db.end()
    console.error('Seed Error:', String(err))
  })
