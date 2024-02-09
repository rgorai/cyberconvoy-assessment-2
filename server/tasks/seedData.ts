export const departmentsList = [
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Engineering',
  'Customer Service',
  'Research and Development',
  'Information Technology',
  'Operations',
  'Legal',
  'Procurement',
  'Product Management',
  'Quality Assurance',
]

export const employeesList: EmployeeCreationDetails[] = [
  {
    first_name: 'James',
    last_name: 'Smith',
    date_of_birth: '1984-03-12',
    title: 'Software Engineer',
    salary: 95000,
  },
  {
    first_name: 'Maria',
    last_name: 'Garcia',
    date_of_birth: '1979-07-08',
    title: 'Project Manager',
    salary: 105000,
  },
  {
    first_name: 'Linda',
    last_name: 'Brown',
    date_of_birth: '1992-05-19',
    title: 'Quality Assurance Engineer',
    salary: 85000,
  },
  {
    first_name: 'Ahmed',
    last_name: 'Hassan',
    date_of_birth: '1988-11-25',
    title: 'Data Analyst',
    salary: 78000,
  },
  {
    first_name: 'Elena',
    last_name: 'Ivanova',
    date_of_birth: '1990-02-14',
    title: 'Human Resources Manager',
    salary: 96000,
  },
].map((employee) => ({
  ...employee,
  department_id: Math.floor(Math.random() * departmentsList.length) + 1,
}))
