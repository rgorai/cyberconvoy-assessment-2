import { AuthProvider } from './authContext'
import { DepartmentsProvider } from './departmentsContext'
import { EmployeesProvider } from './employeesContext'

const AllContextProviders = ({ children }: React.PropsWithChildren) => (
  <AuthProvider>
    <EmployeesProvider>
      <DepartmentsProvider>{children}</DepartmentsProvider>
    </EmployeesProvider>
  </AuthProvider>
)

export default AllContextProviders
