import { useCallback, useEffect, useState } from 'react'
import { fetchAllEmployees } from '../services/apiService'
import PageLoader from '../components/PageLoader'
import HTTP_CODES from '../constants/httpCodes'

const EmployeesPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ServerError | null>(null)
  const [employeesData, setEmployeesData] = useState<Employee[] | null>(null)

  const getAllEmployees = useCallback(() => {
    setLoading(true)
    fetchAllEmployees()
      .then((employees) => {
        console.log('all employees', employees)
        setEmployeesData(employees)
      })
      .catch((err) => {
        console.error('fetch emploees error', err)
        if (err.response) setError(err.response)
        else setError(HTTP_CODES[500])
      })
      .then(() => setLoading(false))
  }, [])

  useEffect(() => {
    getAllEmployees()
  }, [getAllEmployees])

  return (
    <PageLoader loading={loading} error={error} pageData={employeesData}>
      {(employees) => (
        <div className="p-10">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl">Employees</h1>
            <button className="btn-secondary">Add Employee</button>
          </div>

          {employees.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>hello</th>
                </tr>
              </thead>

              <tbody>hi</tbody>
            </table>
          ) : (
            <div>no employees</div>
          )}
        </div>
      )}
    </PageLoader>
  )
}

export default EmployeesPage
