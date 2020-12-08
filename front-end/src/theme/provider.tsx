import React, { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { ConfigContext } from 'contexts'
import { theme } from './theme'

const Provider: React.FC = ({ children }) => {
  const { darkModeEnabled } = useContext(ConfigContext)

  return (
    <ThemeProvider theme={theme(darkModeEnabled)}>{children}</ThemeProvider>
  )
}

export { Provider as ThemeProvider }
