import React from 'react'
import { ConfigContext, ConfigProvider } from './config'
import { AuthContext, AuthProvider } from './auth'
import { TranslationContext, TranslationProvider } from './translation'
import { AlertProvider } from 'components/Alert'

const ContextProviders: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <TranslationProvider>
        <ConfigProvider>
          {/* AuthProvider uses useFetch, which uses useConfig(), so don't swap them around */}
          <AuthProvider>{children}</AuthProvider>
        </ConfigProvider>
      </TranslationProvider>
    </AlertProvider>
  )
}

// Provider
export { ContextProviders }

// Contexts
export { ConfigContext }
export { AuthContext }
export { TranslationContext }
