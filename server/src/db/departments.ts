import db from '.'

export const getAllDepartments = async (): Promise<Department[]> => {
  const [data] = await db.query<DbDepartment[]>('SELECT * FROM departments')
  return data
}
