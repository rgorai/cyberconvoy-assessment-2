import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

// At scale, the implementation of this state management would be
// better suited with Redux as opposed to React Context API

type EmployeesState = {
  allEmployees: Employee[] | null
  individualEmployees: Record<number, Employee>
}

const DEFAULT_STATE: EmployeesState = {
  allEmployees: null,
  individualEmployees: {},
}

const employeesContext = createContext<any>(DEFAULT_STATE)

export const EmployeesProvider = (props: PropsWithChildren) => {
  const [allEmployees, _setAllEmployees] = useState(DEFAULT_STATE.allEmployees)
  const [individualEmployees, setIndividualEmployees] = useState(
    DEFAULT_STATE.individualEmployees
  )

  // helper function to add individual employee data to state
  const addIndividualEmployee = useCallback(
    (employee: Employee) =>
      setIndividualEmployees((prev) => ({
        ...prev,
        [employee.id]: employee,
      })),
    []
  )

  // helper function to add all employees to individual employees
  // state as well, since both share same data structure in this app
  const setAllEmployees = useCallback(
    (employees: Employee[]) => {
      _setAllEmployees(employees)
      for (const employee of employees) addIndividualEmployee(employee)
    },
    [addIndividualEmployee]
  )

  const pushAllEmployees = useCallback(
    (newEmployee: Employee) => {
      _setAllEmployees((prev) => {
        if (!prev) return null

        const existingEmployeeIndex = prev.findIndex(
          (employee) => employee.id === newEmployee.id
        )

        // if employee is already in state, update that record in place
        if (existingEmployeeIndex > -1)
          return prev.map((employee, i) =>
            i === existingEmployeeIndex ? newEmployee : employee
          )
        else return [...prev, newEmployee]
      })

      addIndividualEmployee(newEmployee)
    },
    [addIndividualEmployee]
  )

  const deleteEmployee = useCallback((empId: number) => {
    _setAllEmployees(
      (prev) => prev?.filter((employee) => employee.id !== empId) ?? null
    )
    setIndividualEmployees((prev) => {
      const { [empId]: _, ...rest } = prev
      return rest
    })
  }, [])

  return (
    <employeesContext.Provider
      value={{
        allEmployees,
        setAllEmployees,
        pushAllEmployees,
        individualEmployees,
        addIndividualEmployee,
        deleteEmployee,
      }}
      {...props}
    />
  )
}

export const useEmployeesData = (): {
  allEmployees: EmployeesState['allEmployees']
  setAllEmployees: (employees: Employee[]) => void
  pushAllEmployees: (employee: Employee) => void
  individualEmployees: EmployeesState['individualEmployees']
  addIndividualEmployee: (employee: Employee) => void
  deleteEmployee: (empId: number) => void
} => useContext(employeesContext)
