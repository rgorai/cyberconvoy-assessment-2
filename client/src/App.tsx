import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Fragment } from 'react'
import { AuthProvider } from './services/authContext'
import AuthWrapper from './components/wrappers/AuthWrapper'
import NavBar from './components/NavBar'
import DocumentTitleWrapper from './components/wrappers/DocumentTitleWrapper'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import EmployeesPage from './pages/EmployeesPage'
import ErrorPage from './pages/ErrorPage'
import HTTP_CODES from './constants/httpCodes'
import EmployeeForm from './components/EmployeeForm'
import EmployeeDetailsPage from './pages/EmployeeDetailsPage'

const APP_FEATURES: AppFeatures = [
  {
    label: 'Welcome',
    path: '/',
    element: <HomePage />,
    ensureAuthenticated: false,
  },
  {
    label: 'All Employees',
    path: '/employees',
    element: <EmployeesPage />,
    ensureAuthenticated: true,
  },
  {
    label: 'Create Employee',
    path: '/employees/create',
    element: <EmployeeForm />,
    ensureAuthenticated: true,
  },
  {
    label: 'Employee Details',
    path: '/employees/:empId',
    element: <EmployeeDetailsPage />,
    ensureAuthenticated: true,
  },
]

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <main>
          <Routes>
            {APP_FEATURES.map((feature) => {
              const currRoute = (
                <Route
                  path={feature.path}
                  element={
                    <DocumentTitleWrapper pageTitle={feature.label}>
                      {feature.element}
                    </DocumentTitleWrapper>
                  }
                />
              )
              return (
                <Fragment key={feature.path}>
                  {feature.ensureAuthenticated === null ? (
                    currRoute
                  ) : (
                    <Route
                      element={
                        <AuthWrapper
                          ensureNotAuthenticated={!feature.ensureAuthenticated}
                        />
                      }
                    >
                      {currRoute}
                    </Route>
                  )}
                </Fragment>
              )
            })}

            <Route path="*" element={<ErrorPage {...HTTP_CODES[404]} />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
