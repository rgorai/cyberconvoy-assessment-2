import axios from 'axios'
import { parseApiEmployeeData } from '../utils/parsers'

export const fetchAllEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get<ApiEmployee[]>('/api/employees')
  return data.map((employee) => parseApiEmployeeData(employee))
}

export const fetchSingleEmployee = async (empId: number): Promise<Employee> => {
  const { data } = await axios.get<ApiEmployee>(`/api/employees/${empId}`)
  return parseApiEmployeeData(data)
}

export const submitNewEmployeeData = async (
  details: ApiEmployeeCreationDetails
): Promise<Employee> => {
  const { data } = await axios.post<ApiEmployee>('/api/employees', details)
  return parseApiEmployeeData(data)
}

export const updateEmployee = async (
  empId: number,
  details: ApiEmployeeCreationDetails
): Promise<Employee> => {
  const { data } = await axios.put<ApiEmployee>(
    `/api/employees/${empId}`,
    details
  )
  return parseApiEmployeeData(data)
}

export const deleteEmployee = (empId: number) =>
  axios.delete(`/api/employees/${empId}`)

export const fetchAllDepartments = (): Promise<ApiDepartment[]> =>
  axios.get('/api/departments')
