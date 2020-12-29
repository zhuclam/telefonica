import React, {
  createContext,
  useState,
  FunctionComponent,
  useCallback,
} from 'react'
import { useFetch } from 'hooks'
import { Configurations } from 'types'

interface ConfigType {
  darkModeEnabled: boolean
  advancedModeEnabled: boolean
  testModeEnabled: boolean
  configurations: Configurations
  configsLoading: boolean
  configsError: boolean
  toggleDarkMode: (checked: boolean) => void
  toggleAdvancedMode: (checked: boolean) => void
  toggleTestMode: (checked: boolean) => void
  getConfigs: (Fetch: ReturnType<typeof useFetch>) => Promise<void>
  updateConfigs: (configs: Configurations) => void
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
  const [testModeEnabled, setTestModeEnabled] = useState<boolean>(
    !!localStorage.getItem('test-mode')
  )

  const [configurations, setConfigurations] = useState<
    Configurations | undefined
  >()
  const [configsLoading, setConfigsLoading] = useState<boolean>(true)
  const [configsError, setConfigsError] = useState<boolean>(false)

  const getConfigs = useCallback(async (Fetch: ReturnType<typeof useFetch>) => {
    try {
      setConfigsLoading(true)
      const [err, configs] = await Fetch().get<{ configs: Configurations }>(
        '/configurations'
      )

      if (err) throw err

      setConfigurations(configs.configs)
      setConfigsError(false)
    } catch {
      setConfigsError(true)
    } finally {
      setConfigsLoading(false)
    }
  }, [])

  const updateConfigs = (configs: Configurations) => setConfigurations(configs)

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

  const toggleTestMode = (checked: boolean) => {
    checked
      ? localStorage.setItem('test-mode', '1')
      : localStorage.removeItem('test-mode')
    setTestModeEnabled(checked)
  }

  return {
    darkModeEnabled,
    advancedModeEnabled,
    testModeEnabled,
    configurations: configurations!,
    configsLoading,
    configsError,
    toggleDarkMode,
    toggleAdvancedMode,
    toggleTestMode,
    getConfigs,
    updateConfigs,
  }
}
