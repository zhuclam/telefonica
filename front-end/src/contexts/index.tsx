import React from 'react'
import { ConfigContext, ConfigProvider } from './config'
import { AuthContext, AuthProvider } from './auth'
import { TranslationContext, TranslationProvider } from './translation'
import { AlertProvider } from 'components/Alert'

const ContextProviders: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <ConfigProvider>
        {/* All providers that use useFetch must be below ConfigProvider, I think... */}
        <TranslationProvider>
          <AuthProvider>{children}</AuthProvider>
        </TranslationProvider>
      </ConfigProvider>
    </AlertProvider>
  )
}

// Provider
export { ContextProviders }

// Contexts
export { ConfigContext }
export { AuthContext }
export { TranslationContext }
