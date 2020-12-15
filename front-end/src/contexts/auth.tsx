import React, { createContext, useState, FunctionComponent } from 'react'
import { LOCAL_STORAGE } from 'consts'
import { useFetch } from 'hooks'
import { useAlerts } from 'components'

interface AuthType {
  isAuth: boolean
  isLoading: boolean
  isAdmin: boolean
  doLogin: (userName: string, password: string) => void
  doLogout: () => void
}

interface LoginPayload {
  username: string
  password: string
}

interface LoginResponse {
  accessToken: string
  isAdmin: boolean
}

export const AuthContext = createContext<AuthType>({} as AuthType)

export const AuthProvider: FunctionComponent = ({ children }) => {
  const authValue = useAuth()

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthType => {
  const [isAuth, setIsAuth] = useState<boolean>(
    !!localStorage.getItem(LOCAL_STORAGE.TOKEN)
  )
  const [isAdmin, setIsAdmin] = useState<boolean>(
    !!localStorage.getItem(LOCAL_STORAGE.IS_ADMIN)
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { AlertManager } = useAlerts()

  const Fetch = useFetch()

  const doLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true)

      const [err, response] = await Fetch(false).post<
        LoginPayload,
        LoginResponse
      >('login', {
        username,
        password,
      })

      if (err) throw err

      localStorage.setItem(LOCAL_STORAGE.TOKEN, response.accessToken)
      response.isAdmin
        ? localStorage.setItem(LOCAL_STORAGE.IS_ADMIN, '1')
        : localStorage.removeItem(LOCAL_STORAGE.IS_ADMIN)

      setIsAdmin(response.isAdmin)
      setIsAuth(true)
    } catch (e) {
      e.status === 401 && AlertManager.show('wrong-login-credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const doLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN)
    localStorage.removeItem(LOCAL_STORAGE.IS_ADMIN)
    setIsAuth(false)
    setIsAdmin(false)
  }

  return {
    isAuth,
    isLoading,
    isAdmin: isAuth && isAdmin,
    doLogin,
    doLogout,
  }
}
