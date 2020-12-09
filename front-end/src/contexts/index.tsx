import React from 'react'
import { ConfigContext, ConfigProvider } from './config'
import { AuthContext, AuthProvider } from './auth'
import { AlertProvider } from 'components/Alert'

const ContextProviders: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <ConfigProvider>
        <AuthProvider>{children}</AuthProvider>
      </ConfigProvider>
    </AlertProvider>
  )
}

// Provider
export { ContextProviders }

// Contexts
export { ConfigContext }
export { AuthContext }
