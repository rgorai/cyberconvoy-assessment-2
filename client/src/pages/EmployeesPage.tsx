import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryState } from 'react-router-use-location-state'
import cx from 'classnames'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { fetchAllEmployees } from '../services/apiService'
import PageLoader from '../components/wrappers/PageLoader'
import HTTP_CODES from '../constants/httpCodes'
import EditIcon from '../components/icons/EditIcon'
import { useEmployeesData } from '../context/employeesContext'
import DepartmentsFilter from '../components/DepartmentsFilter'
import { useDepartmentsData } from '../context/departmentsContext'
import { getISODate } from '../utils/strings'

const EmployeesPage = () => {
  const [currDepartmentFilter] = useQueryState('department', -1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ServerError | null>(null)
  const { allEmployees, setAllEmployees } = useEmployeesData()
  const { departments } = useDepartmentsData()

  const currDepartmentFilterName =
    currDepartmentFilter > -1
      ? departments.find((department) => department.id === currDepartmentFilter)
          ?.name
      : null

  const EMPLOYEE_HEADERS: {
    key: keyof Employee
    displayLabel: string
  }[] = [
    {
      key: 'fullName',
      displayLabel: 'Full Name',
    },
    {
      key: 'dateOfBirth',
      displayLabel: 'Date of Birth',
    },
    {
      key: 'department',
      displayLabel: `Department${
        currDepartmentFilterName ? ` (${currDepartmentFilterName})` : ''
      }`,
    },
    {
      key: 'title',
      displayLabel: 'Job Title',
    },
    {
      key: 'salary',
      displayLabel: 'Salary',
    },
  ]

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

  const csvConfig = mkConfig({
    filename: `Employees_Data${
      currDepartmentFilterName
        ? `-${currDepartmentFilterName}_Department-`
        : '_'
    }${new Date().toISOString()}`,
    columnHeaders: EMPLOYEE_HEADERS,
  })

  const bodyCellStyles = 'px-5 py-4 max-w-xs truncate'

  return (
    <PageLoader loading={loading} error={error} pageData={allEmployees}>
      {(employees) => {
        const filteredEmployees =
          currDepartmentFilter > -1
            ? employees.filter(
                (employee) => employee.department.id === currDepartmentFilter
              )
            : employees

        const onCsvClick = () => {
          const csv = generateCsv(csvConfig)(
            filteredEmployees.map((employee) => ({
              ...employee,
              department: employee.department.name,
              dateOfBirth: getISODate(employee.dateOfBirth),
            }))
          )
          download(csvConfig)(csv)
        }

        return (
          <div className="p-16 pb-24 max-w-[90rem] mx-auto">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-5">
                <h1 className="text-4xl">Employees</h1>

                <DepartmentsFilter />
              </div>

              <div className="flex flex-row items-center gap-5">
                <button className="btn btn-tertiary" onClick={onCsvClick}>
                  Download as CSV
                </button>

                <Link
                  className="btn btn-secondary inline-block"
                  to="/employees/create"
                >
                  Add Employee
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table-auto w-full max-w-full mt-12 border border-primary border-separate overflow-hidden">
                <thead>
                  <tr className="bg-primary">
                    {EMPLOYEE_HEADERS.map((header) => (
                      <th className="text-left py-3 px-5" key={header.key}>
                        {header.displayLabel}
                      </th>
                    ))}
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className={bodyCellStyles}>{employee.fullName}</td>

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
                            className={cx('text-gray-400', bodyCellStyles)}
                            key={e}
                          >
                            {e}
                          </td>
                        ))}

                        <td
                          className={cx(
                            'flex flex-row items-center gap-2',
                            bodyCellStyles
                          )}
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
          </div>
        )
      }}
    </PageLoader>
  )
}

export default EmployeesPage
