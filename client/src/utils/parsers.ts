// parse API employee data into a more client-friendly structure
export const parseApiEmployeeData = (data: ApiEmployee): Employee => ({
  id: data.id,
  firstName: data.first_name,
  lastName: data.last_name,
  fullName: `${data.first_name} ${data.last_name}`,
  dateOfBirth: new Date(data.date_of_birth),
  department: {
    id: data.department_id,
    name: data.department_name,
  },
  title: data.title,
  salary: data.salary,
})

export const parseFormEmployeeData = (
  formData: Record<keyof ApiEmployeeCreationDetails, string>
): ApiEmployeeCreationDetails => ({
  ...formData,
  department_id: Number(formData.department_id),
  salary: Number(formData.salary),
})
