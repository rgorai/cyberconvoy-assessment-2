import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllEmployees } from '../services/apiService'
import PageLoader from '../components/wrappers/PageLoader'
import HTTP_CODES from '../constants/httpCodes'
import EditIcon from '../components/icons/EditIcon'
import { useEmployeesData } from '../context/employeesContext'

const EMPLOYEE_HEADERS = [
  'Full Name',
  'Date of Birth',
  'Department',
  'Job Title',
  'Salary',
]

const EmployeesPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ServerError | null>(null)
  const { allEmployees, setAllEmployees } = useEmployeesData()

  const getAllEmployees = useCallback(() => {
    setLoading(true)
    fetchAllEmployees()
      .then((employees) => {
        console.log('all employees', employees)
        setAllEmployees(employees)
      })
      .catch((err) => {
        console.error('get all employees error', err?.response?.data ?? err)
        if (err.response) setError(err.response)
        else setError(HTTP_CODES[500])
      })
      .then(() => setLoading(false))
  }, [setAllEmployees])

  // fetch all employees on render if not already in state
  useEffect(() => {
    if (!allEmployees) getAllEmployees()
  }, [allEmployees, getAllEmployees])

  const bodyCellSpacing = ['px-5', 'py-4']

  return (
    <PageLoader loading={loading} error={error} pageData={allEmployees}>
      {(employees) => (
        <div className="p-16 pb-24 max-w-[85rem] mx-auto">
          <div className="flex flex-row justify-between">
            <h1 className="text-4xl">Employees</h1>

            <div>
              <button className="btn btn-tertiary mr-5">Download as CSV</button>

              <Link
                className="btn btn-secondary inline-block"
                to="/employees/create"
              >
                Add Employee
              </Link>
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
                    <td className={bodyCellSpacing.join(' ')}>
                      {employee.fullName}
                    </td>
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
                      className={`${bodyCellSpacing[1]} flex flex-row items-center gap-2`}
                    >
                      <Link
                        className="btn btn-tertiary inline-block !px-2"
                        to={`/employees/${employee.id}`}
                        title={`Edit ${employee.fullName}`}
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
