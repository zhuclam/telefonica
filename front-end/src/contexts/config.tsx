import React, { createContext, useState, FunctionComponent } from 'react'

interface ConfigType {
  darkModeEnabled: boolean
  advancedModeEnabled: boolean
  toggleDarkMode: (checked: boolean) => void
  toggleAdvancedMode: (checked: boolean) => void
}

export const ConfigContext = createContext<ConfigType>({} as ConfigType)

export const ConfigProvider: FunctionComponent = ({ children }) => {
  const configValue = useConfig()

  return (
    <ConfigContext.Provider value={configValue}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = (): ConfigType => {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(
    !!localStorage.getItem('dark-mode')
  )
  const [advancedModeEnabled, setAdvancedModeEnabled] = useState<boolean>(
    !!localStorage.getItem('advanced-mode')
  )

  const toggleDarkMode = (checked: boolean) => {
    checked
      ? localStorage.setItem('dark-mode', '1')
      : localStorage.removeItem('dark-mode')
    setDarkModeEnabled(checked)
  }

  const toggleAdvancedMode = (checked: boolean) => {
    checked
      ? localStorage.setItem('advanced-mode', '1')
      : localStorage.removeItem('advanced-mode')
    setAdvancedModeEnabled(checked)
  }

  return {
    darkModeEnabled,
    advancedModeEnabled,
    toggleDarkMode,
    toggleAdvancedMode,
  }
}
