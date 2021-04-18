import React from 'react'
import { ConfigContext, ConfigProvider } from './config'
import { AuthContext, AuthProvider } from './auth'
import { AlertProvider } from 'components/Alert'

const ContextProviders: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <ConfigProvider>
        {/* AuthProvider uses useFetch, which uses useConfig(), so don't swap them around */}
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
