import React from 'react'
import { ThemeProvider } from 'styled'
import { useConfig } from 'hooks'
import { theme } from './theme'

const Provider: React.FC = ({ children }) => {
  const { darkModeEnabled } = useConfig()

  return (
    <ThemeProvider theme={theme(darkModeEnabled)}>{children}</ThemeProvider>
  )
}

export { Provider as ThemeProvider }
