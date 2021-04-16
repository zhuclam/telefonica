import { useConfig } from 'hooks'
import React from 'react'
import { Input } from 'reactstrap'

type TerritorySelectorProps = {
  onChange?: (name: string) => void
  defaultValue?: 'current' | 'none'
  excludeCurrent?: boolean
  name?: string
  noEmptyValue?: boolean
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
    },
    ref
  ) => {
    const { currentTerritory, territories } = useConfig()

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
        {territories.map((t) =>
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
