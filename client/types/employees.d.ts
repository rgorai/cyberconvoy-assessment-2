type Employee = {
  id: number
  firstName: string
  lastName: string
  fullName: string
  dateOfBirth: Date
  department: {
    id: number
    name: string
  }
  title: string
  salary: number
}
