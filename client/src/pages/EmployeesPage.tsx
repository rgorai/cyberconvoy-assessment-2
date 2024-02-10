import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllEmployees } from '../services/apiService'
import PageLoader from '../components/PageLoader'
import HTTP_CODES from '../constants/httpCodes'
import EditIcon from '../components/icons/EditIcon'

const EMPLOYEE_HEADERS = [
  'Full Name',
  'Date of Birth',
  'Department',
  'Title',
  'Salary',
]

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

  const bodyCellSpacing = ['px-5', 'py-4']

  return (
    <PageLoader loading={loading} error={error} pageData={employeesData}>
      {(employees) => (
        <div className="p-16 max-w-[85rem] mx-auto">
          <div className="flex flex-row justify-between">
            <h1 className="text-4xl">Employees</h1>

            <div>
              <button className="btn tertiary mr-5">Download as CSV</button>
              <button className="btn secondary">Add Employee</button>
            </div>
          </div>

          {employees.length > 0 ? (
            <table className="w-full mt-12 border border-primary border-separate overflow-hidden">
              <thead>
                <tr className="bg-primary">
                  {EMPLOYEE_HEADERS.map((header) => (
                    <th className="text-left py-3 px-5" key={header}>
                      {header}
                    </th>
                  ))}
                  <th />
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td
                      className={bodyCellSpacing.join(' ')}
                    >{`${employee.firstName} ${employee.lastName}`}</td>
                    {[
                      employee.dateOfBirth.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }),
                      employee.department.name,
                      employee.title,
                      `$${employee.salary.toLocaleString()}`,
                    ].map((e) => (
                      <td
                        className={`${bodyCellSpacing.join(' ')} text-gray-400`}
                        key={e}
                      >
                        {e}
                      </td>
                    ))}

                    <td
                      className={`${bodyCellSpacing[1]} flex flex-row items-center`}
                    >
                      <Link
                        className="btn tertiary inline-block !px-2"
                        to={`/employees/${employee.id}`}
                      >
                        <EditIcon />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="mt-12 italic">
              There are currently no employees.
            </div>
          )}
        </div>
      )}
    </PageLoader>
  )
}

export default EmployeesPage