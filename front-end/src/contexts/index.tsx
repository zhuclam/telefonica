import React from 'react'
import { ConfigContext, ConfigProvider } from './config'
import { AuthContext, AuthProvider } from './auth'

const ContextProviders: React.FC = ({ children }) => {
  return (
    <ConfigProvider>
      <AuthProvider>{children}</AuthProvider>
    </ConfigProvider>
  )
}

// Provider
export { ContextProviders }

// Contexts
export { ConfigContext }
export { AuthContext }
