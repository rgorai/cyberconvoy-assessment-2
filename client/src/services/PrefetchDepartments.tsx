import { useCallback, useEffect } from 'react'
import { useAuthInfo } from '../context/authContext'
import { useDepartmentsData } from '../context/departmentsContext'
import { fetchAllDepartments } from './apiService'

const PrefetchDepartments = () => {
  const { authInfo } = useAuthInfo()
  const { setDepartments } = useDepartmentsData()

  const getDepartments = useCallback(() => {
    fetchAllDepartments()
      .then((departments) => {
        console.log('prefetched departments', departments)
        setDepartments(departments)
      })
      .catch((err) => {
        console.error('prefetch departments error', err?.response?.data ?? err)
      })
  }, [setDepartments])

  // prefetch departments data on app load so it
  // is ready for use everywhere it is needed
  useEffect(() => {
    if (authInfo.authenticated) getDepartments()
  }, [authInfo.authenticated, getDepartments])

  return null
}

export default PrefetchDepartments
