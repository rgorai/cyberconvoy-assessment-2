import { useQueryState } from 'react-router-use-location-state'
import { useDepartmentsData } from '../context/departmentsContext'
import Dropdown from './Dropdown'
import FilterIcon from './icons/FilterIcon'

const DepartmentsFilter = () => {
  const [currDepartmentFilter, setCurrDepartmentFilter] = useQueryState(
    'department',
    -1
  )
  const { departments } = useDepartmentsData()

  return (
    <Dropdown
      buttonContent={<FilterIcon className="w-8" />}
      buttonClassname="text-gray-400 hover:text-gray-500"
      buttonTitle="Filter by department"
    >
      <div className="relative">
        <div className="max-h-[15rem] overflow-auto">
          <ul className="py-2">
            {departments.map((department) => (
              <li
                className="whitespace-nowrap hover:bg-gray-600 px-4"
                key={department.id}
              >
                <label className="flex items-center py-2 cursor-pointer">
                  <input
                    type="radio"
                    name="options"
                    checked={currDepartmentFilter === department.id}
                    onChange={() => setCurrDepartmentFilter(department.id)}
                  />
                  <span className="ml-2">{department.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="sticky bottom-0 flex flex-row justify-end w-full bg-gray-600 px-3 py-2">
          <button
            className="btn btn-tertiary"
            onClick={() => setCurrDepartmentFilter(-1)}
          >
            Clear
          </button>
        </div>
      </div>
    </Dropdown>
  )
}

export default DepartmentsFilter
