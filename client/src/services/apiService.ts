import axios from 'axios'

const parseEmployeeData = (data: ApiEmployee): Employee => ({
  id: data.id,
  firstName: data.first_name,
  lastName: data.last_name,
  dateOfBirth: new Date(data.date_of_birth),
  department: {
    id: data.department_id,
    name: data.department_name,
  },
  title: data.title,
  salary: data.salary,
})

export const fetchAllEmployees = async () => {
  const { data } = await axios.get<ApiEmployee[]>('/api/employees')
  return data.map((employee) => parseEmployeeData(employee))
}
