import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Fragment } from 'react'
import { AuthProvider } from './services/authContext'
import AuthWrapper from './components/AuthWrapper'
import NavBar from './components/NavBar'
import DocumentTitleWrapper from './components/DocumentTitleWrapper'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'

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
    element: <>employees page</>,
    ensureAuthenticated: true,
  },
  {
    label: 'Employee Details',
    path: '/employees/:empId',
    element: <>employee details page</>,
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

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
