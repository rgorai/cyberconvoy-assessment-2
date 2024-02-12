import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEmployeesData } from '../context/employeesContext'
import PageLoader from '../components/wrappers/PageLoader'
import { fetchSingleEmployee } from '../services/apiService'
import HTTP_CODES from '../constants/httpCodes'
import EmployeeForm from '../components/EmployeeForm'

export const EmployeeDetailsPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ServerError | null>(null)
  const { individualEmployees, addIndividualEmployee } = useEmployeesData()
  const { empId } = useParams()

  const currEmployeeDetails = empId
    ? individualEmployees[Number(empId)]
    : undefined

  const getEmployeeDetails = useCallback(
    (id: number) => {
      setLoading(true)
      fetchSingleEmployee(id)
        .then((employee) => {
          console.log('employee details', employee)
          addIndividualEmployee(employee)
        })
        .catch((err) => {
          console.error('get single employee error', err?.response?.data ?? err)
          if (err.response) setError(err.response)
          else setError(HTTP_CODES[500])
        })
        .then(() => setLoading(false))
    },
    [addIndividualEmployee]
  )

  // fetch employee details on render if not already in state
  useEffect(() => {
    if (!currEmployeeDetails && empId) getEmployeeDetails(Number(empId))
  }, [currEmployeeDetails, empId, getEmployeeDetails])

  return (
    <PageLoader loading={loading} error={error} pageData={currEmployeeDetails}>
      {(employee) => (
        <div className="p-16">
          <EmployeeForm employeeDetails={employee} />
        </div>
      )}
    </PageLoader>
  )
}

export default EmployeeDetailsPage
