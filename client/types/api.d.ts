/**
 * @author rgorai
 * @description the employee data returned from the API
 * @param id the db id of the employee
 * @param first_name employee's first name
 * @param last_name employee's last name
 * @param date_of_birth employee's DOB as an ISO-8601 string
 * @param department_id id of the department this employee currently belongs to
 * @param department_name the name of their department
 * @param title employee's current job title
 * @param salary employee's current yearly salary
 */
type ApiEmployee = {
  id: number
  first_name: string
  last_name: string
  date_of_birth: string
  department_id: number
  department_name: string
  title: string
  salary: number
}

type ApiEmployeeCreationDetails = Omit<ApiEmployee, 'id' | 'department_name'>

/**
 * @author rgorai
 * @description the department data returned from the API
 * @param id the db id of the department
 * @param name the name of the department
 */
type ApiDepartment = {
  id: number
  name: string
}
