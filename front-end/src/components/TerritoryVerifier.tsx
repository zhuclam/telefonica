import React, { useEffect } from 'react'
import { Redirect, useLocation } from 'react-router'
import { useConfig } from 'hooks'
import { Spinner } from '.'
import { stripTerritory } from 'utils'

interface TerritoryVerifierProps {
  territory: string
}

const TerritoryVerifier: React.FC<TerritoryVerifierProps> = ({
  children,
  territory,
}) => {
  const { territories, configsLoading, setCurrentTerritory } = useConfig()
  const location = useLocation()

  const territoryData = territories.find(
    ({ name }) => name.toLowerCase() === territory.toLowerCase()
  )
  const isValid = !!territoryData

  useEffect(() => {
    if (isValid) setCurrentTerritory(territoryData!)
  }, [territoryData, isValid, setCurrentTerritory])

  if (configsLoading && !territories.length)
    return <Spinner fulfill container />

  return isValid ? (
    <>{children}</>
  ) : (
    <Redirect
      to={`/base/${stripTerritory(location.pathname)}${location.search}`}
    />
  )
}

export { TerritoryVerifier }
