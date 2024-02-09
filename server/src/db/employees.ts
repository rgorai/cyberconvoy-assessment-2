import { areValidNumbers, areValidEmployeeDetails } from '../utils/errorChecks'
import { isOkInsertSingle, isOkUpdateSingle } from '../utils/typeGuards'
import db from '.'

export const getAllEmployees = async (): Promise<Employee[]> => {
  const [data] = await db.query<DbEmployee[]>('SELECT * FROM employees')
  return data
}

export const getEmployeeById = async (
  employeeId: number
): Promise<Employee | null> => {
  // error check
  areValidNumbers({ employeeId })

  // get employee
  const [[data]] = await db.query<DbEmployee[]>(
    `SELECT * FROM employees WHERE id = ?`,
    [employeeId]
  )
  return data ?? null
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

  if (!isOkInsertSingle(result))
    throw `Insert failed: ${JSON.stringify(result)}`

  return (await getEmployeeById(result.insertId)) as Employee
}

export const updateEmployeeDetails = async (
  details: Employee
): Promise<Employee | null> => {
  // error check
  if (!(await getEmployeeById(details.id))) return null
  await areValidEmployeeDetails(details)

  // insert row
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

  if (!isOkUpdateSingle(result))
    throw `Insert failed: ${JSON.stringify(result)}`

  return (await getEmployeeById(details.id)) as Employee
}
