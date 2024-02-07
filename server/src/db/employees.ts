import db from '.'

export const getAllEmployees = async (): Promise<Employee[]> => {
  const [data] = await db.query<DbEmployee[]>('SELECT * FROM employees')
  return data
}

export const getEmployeeById = async (
  employeeId: string
): Promise<Employee | null> => {
  const [[data]] = await db.query<DbEmployee[]>(
    `SELECT * FROM employees WHERE id = ?`,
    [employeeId]
  )
  return data ?? null
}
