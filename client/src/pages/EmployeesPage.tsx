import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryState } from 'react-router-use-location-state'
import { fetchAllEmployees } from '../services/apiService'
import PageLoader from '../components/wrappers/PageLoader'
import HTTP_CODES from '../constants/httpCodes'
import EditIcon from '../components/icons/EditIcon'
import { useEmployeesData } from '../context/employeesContext'
import DepartmentsFilter from '../components/DepartmentsFilter'

const EMPLOYEE_HEADERS = [
  'Full Name',
  'Date of Birth',
  'Department',
  'Job Title',
  'Salary',
]

const EmployeesPage = () => {
  const [currDepartmentFilter] = useQueryState('department', -1)
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
      {(employees) => {
        const filteredEmployees = employees.filter((employee) =>
          currDepartmentFilter > -1
            ? employee.department.id === currDepartmentFilter
            : true
        )

        return (
          <div className="p-16 pb-24 max-w-[85rem] mx-auto">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-5">
                <h1 className="text-4xl">Employees</h1>

                <DepartmentsFilter />
              </div>

              <div className="flex flex-row items-center gap-5">
                <button className="btn btn-tertiary">Download as CSV</button>

                <Link
                  className="btn btn-secondary inline-block"
                  to="/employees/create"
                >
                  Add Employee
                </Link>
              </div>
            </div>

            <table className="w-full max-w-full mt-12 border border-primary border-separate overflow-hidden">
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
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
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
                          className="btn btn-tertiary inline-block !px-2 mr-1"
                          to={`/employees/${employee.id}`}
                          title={`Edit ${employee.fullName}`}
                        >
                          <EditIcon />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="mt-12 italic text-center p-5"
                      colSpan={EMPLOYEE_HEADERS.length + 1}
                    >
                      No employees.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      }}
    </PageLoader>
  )
}

export default EmployeesPage
