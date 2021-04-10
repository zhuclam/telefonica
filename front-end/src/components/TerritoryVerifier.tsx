import React, { useEffect } from 'react'
import { Redirect, useLocation } from 'react-router'
import { useConfig } from 'hooks'
import { Spinner } from '.'

interface TerritoryVerifierProps {
  territory: string
}

const TerritoryVerifier: React.FC<TerritoryVerifierProps> = ({
  children,
  territory,
}) => {
  const { territories, configsLoading, setCurrentTerritory } = useConfig()
  const location = useLocation()

  const territoryData = territories.find(({ name }) => name === territory)
  const isValid = !!territoryData

  useEffect(() => {
    if (isValid) setCurrentTerritory(territoryData!)
  }, [territoryData, isValid, setCurrentTerritory])

  if (configsLoading) return <Spinner fulfill container />

  return isValid ? (
    <>{children}</>
  ) : (
    <Redirect to={`/base/${stripTerritory(location.pathname)}`} />
  )
}

const stripTerritory = (path: string): string =>
  (path.startsWith('/') ? path.slice(1) : path).split('/').slice(1).join('/')

export { TerritoryVerifier }
