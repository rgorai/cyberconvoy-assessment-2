import { createContext, useContext, useState } from 'react'

const DEFAULT_STATE: ApiDepartment[] = []

const departmentsContext = createContext<any>(DEFAULT_STATE)

export const DepartmentsProvider = (props: React.PropsWithChildren) => {
  const [departments, setDepartments] = useState(DEFAULT_STATE)

  return (
    <departmentsContext.Provider
      value={{
        departments,
        setDepartments,
      }}
      {...props}
    />
  )
}

export const useDepartmentsData = (): {
  departments: ApiDepartment[]
  setDepartments: React.Dispatch<React.SetStateAction<ApiDepartment[]>>
} => useContext(departmentsContext)
