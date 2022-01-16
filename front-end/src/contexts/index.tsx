import React from 'react'
import { ConfigContext, ConfigProvider } from './config'
import { AuthContext, AuthProvider } from './auth'
import { TranslationContext, TranslationProvider } from './translation'
import { ButtonColorContext, ButtonColorProvider } from './buttonColor'
import { AlertProvider } from 'components/Alert'

const ContextProviders: React.FC = ({ children }) => {
  return (
    <AlertProvider>
      <ConfigProvider>
        {/* All providers that use useFetch must be below ConfigProvider, I think... */}
        <TranslationProvider>
          <ButtonColorProvider>
            <AuthProvider>{children}</AuthProvider>
          </ButtonColorProvider>
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
export { ButtonColorContext }
