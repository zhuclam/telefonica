import React, { useEffect } from 'react'
import { Redirect, useLocation } from 'react-router'
import { useAuth, useConfig } from 'hooks'
import { Spinner } from '.'
import { stripTerritory } from 'utils'

interface TerritoryVerifierProps {
  territory: string
}

const TerritoryVerifier: React.FC<TerritoryVerifierProps> = ({
  children,
  territory,
}) => {
  const {
    territories,
    configsLoading,
    registeredTerritories,
    setCurrentTerritory,
    registerTerritory,
    unregisterTerritory,
  } = useConfig()
  const { isAdmin } = useAuth()
  const location = useLocation()

  const baseTerritoryName =
    territories.find(({ id }) => id === 1)?.name ?? 'base'

  const territoryData = territories.find(
    ({ name }) => name.toLowerCase() === territory.toLowerCase()
  )
  const isValid = !!territoryData

  useEffect(() => {
    if (isValid) setCurrentTerritory(territoryData!)
  }, [territoryData, isValid, setCurrentTerritory])

  useEffect(() => {
    // register territory once we checked if is valid
    if (!territories.length) return
    if (isValid)
      registerTerritory(territoryData!.id, territoryData!.name, isAdmin)
  }, [territories, isValid, territoryData, registerTerritory, isAdmin])

  useEffect(() => {
    // unregister all invalid territories once we have territories fetched
    if (!territories.length) return
    const existingTerritories = territories.map((t) => t.id)
    registeredTerritories.forEach(
      (id) => !existingTerritories.includes(id) && unregisterTerritory(id)
    )
  }, [territories, registeredTerritories, unregisterTerritory])

  if (configsLoading && !territories.length)
    return <Spinner fulfill container />

  return isValid ? (
    <>{children}</>
  ) : (
    <Redirect
      to={`/${baseTerritoryName}/${stripTerritory(location.pathname)}${
        location.search
      }`}
    />
  )
}

export { TerritoryVerifier }
