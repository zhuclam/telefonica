import { useCallback } from 'react'
import { Fetch } from 'services'
import { useConfig } from '.'

const useFetch = () => {
  const { testModeEnabled, currentTerritory } = useConfig()

  const FetchFunction = useCallback(
    (useToken: boolean = true) =>
      new Fetch(testModeEnabled, useToken, currentTerritory?.id),
    [testModeEnabled, currentTerritory?.id]
  )

  return FetchFunction
}

export { useFetch }
