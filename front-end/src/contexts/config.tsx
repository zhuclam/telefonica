import React, {
  createContext,
  useState,
  FunctionComponent,
  useCallback,
} from 'react'
import { useFetch } from 'hooks'
import { Configurations, Territory } from 'types'
import { LOCAL_STORAGE } from 'consts'

interface ConfigType {
  darkModeEnabled: boolean
  advancedModeEnabled: boolean
  testModeEnabled: boolean
  configurations: Configurations
  territories: Territory[]
  configsLoading: boolean
  configsError: boolean
  currentTerritory: Territory
  toggleDarkMode: (checked: boolean) => void
  toggleAdvancedMode: (checked: boolean) => void
  toggleTestMode: (checked: boolean) => void
  getConfigs: (Fetch: ReturnType<typeof useFetch>) => Promise<void>
  updateConfigs: (configs: Configurations) => void
  setCurrentTerritory: (territory: Territory) => void
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
    !!localStorage.getItem(LOCAL_STORAGE.DARK_MODE)
  )
  const [advancedModeEnabled, setAdvancedModeEnabled] = useState<boolean>(
    !!localStorage.getItem(LOCAL_STORAGE.ADVANCED_MODE)
  )
  const [testModeEnabled, setTestModeEnabled] = useState<boolean>(
    !!localStorage.getItem(LOCAL_STORAGE.TEST_MODE)
  )

  const [configurations, setConfigurations] = useState<
    Configurations | undefined
  >()
  const [territories, setTerritories] = useState<Territory[]>([])
  const [currentTerritory, setCurrentTerritory] = useState<
    Territory | undefined
  >()
  const [configsLoading, setConfigsLoading] = useState<boolean>(true)
  const [configsError, setConfigsError] = useState<boolean>(false)

  const getConfigs = useCallback(async (Fetch: ReturnType<typeof useFetch>) => {
    try {
      setConfigsLoading(true)
      const [err, response] = await Fetch().get<{
        configs: Configurations
        territories: Territory[]
      }>('/configurations')

      if (err) throw err

      setConfigurations(response.configs)
      setTerritories(response.territories)
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
      ? localStorage.setItem(LOCAL_STORAGE.DARK_MODE, '1')
      : localStorage.removeItem(LOCAL_STORAGE.DARK_MODE)
    setDarkModeEnabled(checked)
  }

  const toggleAdvancedMode = (checked: boolean) => {
    checked
      ? localStorage.setItem(LOCAL_STORAGE.ADVANCED_MODE, '1')
      : localStorage.removeItem(LOCAL_STORAGE.ADVANCED_MODE)
    setAdvancedModeEnabled(checked)
  }

  const toggleTestMode = (checked: boolean) => {
    checked
      ? localStorage.setItem(LOCAL_STORAGE.TEST_MODE, '1')
      : localStorage.removeItem(LOCAL_STORAGE.TEST_MODE)
    setTestModeEnabled(checked)
  }

  return {
    darkModeEnabled,
    advancedModeEnabled,
    testModeEnabled,
    configurations: configurations!,
    territories,
    configsLoading,
    configsError,
    currentTerritory: currentTerritory!,
    toggleDarkMode,
    toggleAdvancedMode,
    toggleTestMode,
    getConfigs,
    updateConfigs,
    setCurrentTerritory,
  }
}
