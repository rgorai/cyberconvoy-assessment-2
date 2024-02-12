import { PropsWithChildren, createContext, useContext, useState } from 'react'

const DEFAULT_STATE: AuthResponse = { authenticated: false }

const authContext = createContext<any>(DEFAULT_STATE)

export const AuthProvider = (props: PropsWithChildren) => {
  const [authInfo, setAuthInfo] = useState(DEFAULT_STATE)
  return <authContext.Provider value={{ authInfo, setAuthInfo }} {...props} />
}

export const useAuthInfo = (): {
  authInfo: AuthResponse
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthResponse>>
} => useContext(authContext)
