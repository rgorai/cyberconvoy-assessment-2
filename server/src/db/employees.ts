import { areValidNumbers, areValidEmployeeDetails } from '../utils/errorChecks'

import { getISODate } from '../utils/strings'
import {
  isOkSingleDelete,
  isOkSingleInsert,
  isOkSingleUpdate,
} from '../utils/typeGuards'
import db from '.'

export const getAllEmployees = async (): Promise<EmployeeFull[]> => {
  const [data] = await db.query<DbEmployeeFull[]>(`
    SELECT employees.*, departments.name AS department_name
    FROM employees
    JOIN departments ON employees.department_id = departments.id
  `)
  return data
}

export const getEmployeeById = async (
  employeeId: number
): Promise<EmployeeFull | null> => {
  // error check
  areValidNumbers({ employeeId })

  // get employee
  const [[data]] = await db.query<DbEmployeeFull[]>(
    `SELECT employees.*, departments.name AS department_name
    FROM employees
    JOIN departments ON employees.department_id = departments.id
    WHERE employees.id = ?`,
    [employeeId]
  )
  if (!data) return null

  // reformat date
  data.date_of_birth = getISODate(data.date_of_birth)

  return data
}

export const insertEmployee = async (
  details: EmployeeCreationDetails
): Promise<Employee> => {
  // error check
  await areValidEmployeeDetails(details)

  // insert row
  const [result] = await db.query(
    `INSERT INTO employees (
      first_name, 
      last_name, 
      date_of_birth, 
      department_id, 
      title, 
      salary
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      details.first_name,
      details.last_name,
      details.date_of_birth,
      details.department_id,
      details.title,
      details.salary,
    ]
  )

  // validate result
  if (!isOkSingleInsert(result))
    throw `Insert failed: ${JSON.stringify(result)}`

  return (await getEmployeeById(result.insertId)) as Employee
}

export const updateEmployeeDetails = async (
  details: Employee
): Promise<Employee | null> => {
  // error check
  if (!(await getEmployeeById(details.id))) return null
  await areValidEmployeeDetails(details)

  // update row
  const [result] = await db.query(
    `UPDATE employees
    SET
      first_name = ?,
      last_name = ?,
      date_of_birth = ?,
      department_id = ?,
      title = ?,
      salary = ?
    WHERE
      id = ?`,
    [
      details.first_name,
      details.last_name,
      details.date_of_birth,
      details.department_id,
      details.title,
      details.salary,
      details.id,
    ]
  )

  // validate result
  if (!isOkSingleUpdate(result))
    throw `Update failed: ${JSON.stringify(result)}`

  return (await getEmployeeById(details.id)) as Employee
}

export const deleteEmployee = async (
  employeeId: number
): Promise<Employee | null> => {
  // error check
  const employee = await getEmployeeById(employeeId)
  if (!employee) return null

  // delete row
  const [result] = await db.query('DELETE FROM employees WHERE id = ?', [
    employeeId,
  ])

  // validate result
  if (!isOkSingleDelete(result))
    throw `Delete failed: ${JSON.stringify(result)}`

  return employee
}
