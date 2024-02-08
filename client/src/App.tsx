import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Fragment } from 'react'
import { AuthProvider } from './services/authContext'
import AuthWrapper from './components/AuthWrapper'
import NavBar from './components/NavBar'
import Logout from './components/Logout'
import DocumentTitleWrapper from './components/DocumentTitleWrapper'

const APP_FEATURES: AppFeatures = [
  {
    label: 'Home',
    path: '/',
    element: <>home page</>,
    ensureAuthenticated: false,
  },
  {
    label: 'All Employees',
    path: '/employees',
    element: <>employees page</>,
    ensureAuthenticated: true,
  },
  {
    label: 'Employee Details',
    path: '/employees/:empId',
    element: <>employee details page</>,
    ensureAuthenticated: true,
  },
  {
    label: 'Logout',
    path: '/logout',
    element: <Logout />,
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
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
