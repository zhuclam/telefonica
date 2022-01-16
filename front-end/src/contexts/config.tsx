import React, {
  createContext,
  useState,
  FunctionComponent,
  useCallback,
} from 'react'
import { useFetch } from 'hooks'
import { Configurations, Territory } from 'types'
import { LOCAL_STORAGE } from 'consts'
import { useAlerts } from 'components'

interface ConfigType {
  CONG_INITIALS: string
  darkModeEnabled: boolean
  advancedModeEnabled: boolean
  testModeEnabled: boolean
  configurations: Configurations
  territories: Territory[]
  configsLoading: boolean
  configsError: boolean
  currentTerritory: Territory
  registeredTerritories: number[]
  toggleDarkMode: (checked: boolean) => void
  toggleAdvancedMode: (checked: boolean) => void
  toggleTestMode: (checked: boolean) => void
  getConfigs: (Fetch: ReturnType<typeof useFetch>) => Promise<void>
  updateConfigs: (configs: Configurations) => void
  setCurrentTerritory: (territory: Territory) => void
  updateTerritories: (territories: Territory[]) => void
  registerTerritory: (id: number, name: string, isAdmin: boolean) => void
  unregisterTerritory: (id: number) => void
}

export const ConfigContext = createContext<ConfigType>({} as ConfigType)

export const ConfigProvider: FunctionComponent = ({ children }) => {
  const configValue = useConfigInternal()

  return (
    <ConfigContext.Provider value={configValue}>
      {children}
    </ConfigContext.Provider>
  )
}

const useConfigInternal = (): ConfigType => {
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(
    !!localStorage.getItem(LOCAL_STORAGE.DARK_MODE)
  )
  const [advancedModeEnabled, setAdvancedModeEnabled] = useState<boolean>(
    !!localStorage.getItem(LOCAL_STORAGE.ADVANCED_MODE)
  )
  const [testModeEnabled, setTestModeEnabled] = useState<boolean>(
    !!localStorage.getItem(LOCAL_STORAGE.TEST_MODE)
  )

  const [CONG_INITIALS, setCongInitials] = useState<string>('')

  const [configurations, setConfigurations] =
    useState<Configurations | undefined>()
  const [territories, setTerritories] = useState<Territory[]>([])
  const [currentTerritory, setCurrentTerritory] =
    useState<Territory | undefined>()
  const [configsLoading, setConfigsLoading] = useState<boolean>(true)
  const [configsError, setConfigsError] = useState<boolean>(false)

  const [registeredTerritories, setRegisteredTerritories] = useState<number[]>(
    () => {
      const stored = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE.REGISTERED_TERRITORIES) ?? '[]'
      )
      if (stored.length) return stored

      const initialState = [1] // [base]
      localStorage.setItem(
        LOCAL_STORAGE.REGISTERED_TERRITORIES,
        JSON.stringify(initialState)
      )
      return initialState
    }
  )

  const { AlertManager } = useAlerts()

  const getConfigs = useCallback(async (Fetch: ReturnType<typeof useFetch>) => {
    try {
      setConfigsLoading(true)
      const [err, response] = await Fetch().get<{
        configs: Configurations
        territories: Territory[]
        initials: string
      }>('/configurations')

      if (err) throw err

      setCongInitials(response.initials)
      setConfigurations(response.configs)
      setTerritories(
        response.territories.map((t) => ({
          ...t,
          name: decodeURIComponent(t.name),
        }))
      )
      setConfigsError(false)
    } catch {
      setConfigsError(true)
    } finally {
      setConfigsLoading(false)
    }
  }, [])

  const updateConfigs = (configs: Configurations) => setConfigurations(configs)

  const updateTerritories = useCallback((territories: Territory[]) => {
    setTerritories(
      territories.map((t) => ({ ...t, name: decodeURIComponent(t.name) }))
    )
  }, [])

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

  const registerTerritory = useCallback(
    (id: number, name: string, isAdmin: boolean) => {
      const stored: number[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE.REGISTERED_TERRITORIES) ?? '[]'
      )
      const alreadyRegistered = stored.some((i) => i === id)

      if (alreadyRegistered) return

      stored.push(id)
      localStorage.setItem(
        LOCAL_STORAGE.REGISTERED_TERRITORIES,
        JSON.stringify(stored)
      )
      setRegisteredTerritories(stored)
      !isAdmin &&
        AlertManager.show('territory-registered-alert', {
          timeout: 2000,
          data: name,
        })
    },
    [AlertManager]
  )

  const unregisterTerritory = useCallback((id: number) => {
    const stored: number[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.REGISTERED_TERRITORIES) ?? '[]'
    )
    const alreadyUnregistered = !stored.some((i) => i === id)

    if (alreadyUnregistered) return

    const newStore = stored.filter((i) => i !== id)
    localStorage.setItem(
      LOCAL_STORAGE.REGISTERED_TERRITORIES,
      JSON.stringify(newStore)
    )
    setRegisteredTerritories(newStore)
  }, [])

  return {
    CONG_INITIALS,
    darkModeEnabled,
    advancedModeEnabled,
    testModeEnabled,
    configurations: configurations!,
    territories,
    configsLoading,
    configsError,
    currentTerritory: currentTerritory!,
    registeredTerritories,
    toggleDarkMode,
    toggleAdvancedMode,
    toggleTestMode,
    getConfigs,
    updateConfigs,
    setCurrentTerritory,
    updateTerritories,
    registerTerritory,
    unregisterTerritory,
  }
}
