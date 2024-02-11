import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const EmployeeDetailsPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ServerError | null>(null)
  const [employeeData, setEmployeeData] = useState<Employee | null>(null)
  const { empId } = useParams()

  return <div>details page</div>
}

export default EmployeeDetailsPage
