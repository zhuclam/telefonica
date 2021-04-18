import { useConfig } from 'hooks'
import React from 'react'
import { Input } from 'reactstrap'

type TerritorySelectorProps = {
  onChange?: (name: string) => void
  defaultValue?: 'current' | 'none'
  excludeCurrent?: boolean
  name?: string
  noEmptyValue?: boolean
  availableTerritories?: 'all' | 'registered'
}

const TerritorySelector = React.forwardRef<
  HTMLInputElement,
  TerritorySelectorProps
>(
  (
    {
      onChange,
      defaultValue = 'none',
      excludeCurrent = false,
      name,
      noEmptyValue = false,
      availableTerritories = 'all',
    },
    ref
  ) => {
    const { currentTerritory, territories, registeredTerritories } = useConfig()

    const options =
      availableTerritories === 'all'
        ? territories
        : territories.filter((t) => registeredTerritories.includes(t.id))

    return (
      <Input
        type="select"
        onChange={(e) => onChange?.(e.target.value)}
        defaultValue={
          defaultValue === 'current'
            ? currentTerritory.name
            : noEmptyValue
            ? undefined
            : ''
        }
        innerRef={ref}
        name={name}
      >
        {defaultValue === 'none' && !noEmptyValue && <option value=""></option>}
        {options.map((t) =>
          t.id === currentTerritory.id && excludeCurrent ? null : (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          )
        )}
      </Input>
    )
  }
)

export { TerritorySelector }
