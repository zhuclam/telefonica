import { useCallback } from 'react'
import { Fetch } from 'services'
import { useConfig } from '.'

const useFetch = () => {
  const { testModeEnabled } = useConfig()

  const FetchFunction = useCallback(
    (useToken: boolean = true) => new Fetch(testModeEnabled, useToken),
    [testModeEnabled]
  )

  return FetchFunction
}

export { useFetch }
