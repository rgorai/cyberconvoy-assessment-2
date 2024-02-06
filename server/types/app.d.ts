/**
 * @author rgorai
 * @description the schema for the employee's db table
 * @param id the db id of the employee
 * @param first_name employee's first name
 * @param last_name employee's last name
 * @param date_of_birth employee's DOB as an ISO-8601 string
 * @param department_id id of the department this employee currently belongs to
 * @param title employee's current job title
 * @param salary employee's current yearly salary
 */
type Employee = {
  id: number
  first_name: string
  last_name: string
  date_of_birth: string
  department_id: number
  title: string
  salary: number
}

/**
 * @author rgorai
 * @description the schema for the employee's db table
 * @param id the db id of the department
 * @param name the name of the department
 */
type Department = {
  id: number
  name: string
}
