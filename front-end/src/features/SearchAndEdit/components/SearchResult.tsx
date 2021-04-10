import React, { useCallback, useMemo, useState } from 'react'
import { Button, Table, Input } from 'reactstrap'
import styled, { css } from 'styled-components'
import { Phone } from 'types'
import { useConfig } from 'hooks'

interface SearchResultProps {
  entries: Phone[]
  count: number
  onEditRequest: (phone: Phone) => void
  onDeleteRequest: (id: number) => void
  onDeleteManyRequest: (ids: number[]) => void
}

type CheckedMap = { [k: number]: boolean }

const SearchResult: React.FC<SearchResultProps> = ({
  entries,
  count,
  onEditRequest,
  onDeleteRequest,
  onDeleteManyRequest,
}) => {
  const { currentTerritory } = useConfig()
  const buildCheckedInputs = useCallback(
    (checked: boolean) =>
      entries.reduce((acc, curr) => {
        acc[curr.id] = checked
        return acc
      }, {} as CheckedMap),
    [entries]
  )
  const [checkedInputs, setCheckedInputs] = useState<CheckedMap>(() =>
    buildCheckedInputs(false)
  )

  const onCheckInput = (id: number, checked: boolean) =>
    setCheckedInputs({ ...checkedInputs, [id]: checked })

  const allSelected = useMemo(
    () => !Object.values(checkedInputs).some((checked) => !checked),
    [checkedInputs]
  )

  const onToggleSelectAll = () =>
    setCheckedInputs(buildCheckedInputs(!allSelected))

  const selectedCount = useMemo(
    () => Object.values(checkedInputs).filter(Boolean).length,
    [checkedInputs]
  )

  const handleDeleteMany = () =>
    onDeleteManyRequest(
      Object.entries(checkedInputs)
        .filter(([, checked]) => checked)
        .map(([id]) => parseInt(id))
    )

  const onSelfAssign = (id: number) => {
    const a = document.createElement('a')
    a.href = `/${currentTerritory.name}/telefonica?id=${id}`
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <>
      <h3>
        Mostrando {entries.length} de {count} resultados.
      </h3>
      <Hr />
      <ActionPanel>
        ({selectedCount} seleccionados)
        <span style={{ margin: '0 1rem' }}>|</span>
        <Button color="secondary" onClick={onToggleSelectAll}>
          {allSelected ? 'Des' : 'S'}eleccionar todos
        </Button>
        <Button
          color="danger"
          disabled={selectedCount === 0}
          onClick={handleDeleteMany}
        >
          Borrar todos los seleccionados
        </Button>
      </ActionPanel>
      <Table striped responsive>
        <Thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Info</th>
            <th>Última vez llamado</th>
            <th>Última vez que atendió</th>
            <th>Comentarios</th>
            <th>Días pospuesto</th>
            <th>Características</th>
            <th>Acciones</th>
          </tr>
        </Thead>
        <Tbody>
          {entries.map((phone) => (
            <tr key={phone.id}>
              <td>
                <Centered>
                  <Input
                    type="checkbox"
                    checked={checkedInputs[phone.id]}
                    onChange={(e) => onCheckInput(phone.id, e.target.checked)}
                  />
                </Centered>
              </td>
              <td>{phone.id}</td>
              <PhoneCell>{phone.phone}</PhoneCell>
              <td>{phone.info}</td>
              <td>{phone.unansweredDate || phone.fulfilledOn || 'Nunca'}</td>
              <td>{phone.answeredOn || 'Nunca'}</td>
              <td>{phone.comments}</td>
              <td>{phone.postponedDays}</td>
              <td>
                {[
                  phone.noCall && 'No visitar',
                  phone.nonExistent && 'No existe',
                  phone.noWeekends && 'No llamar los finde',
                ]
                  .filter(Boolean)
                  .join(', ')}
              </td>
              <ActionCell>
                <Button color="success" onClick={() => onSelfAssign(phone.id)}>
                  Autoasignar
                </Button>
                <Button color="warning" onClick={() => onEditRequest(phone)}>
                  Editar
                </Button>
                <Button
                  color="danger"
                  onClick={() => onDeleteRequest(phone.id)}
                >
                  Borrar
                </Button>
              </ActionCell>
            </tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

const Thead = styled.thead`
  text-align: center;

  > tr > th {
    vertical-align: middle;
  }
`

const Tbody = styled.tbody`
  text-align: center;
`

const PhoneCell = styled.td`
  white-space: nowrap;
`

const ActionCell = styled.td`
  white-space: nowrap;

  button:not(:first-of-type) {
    margin-left: 1em;
  }
`

const ActionPanel = styled.div`
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.text.colors.white};
  z-index: 1;

  ${({ theme }) =>
    theme.darkMode &&
    css`
      background: ${theme.text.colors.black};
      color: ${theme.text.colors.white};
    `}

  button:not(:first-of-type) {
    margin-left: 1em;
  }
`

const Centered = styled.div`
  padding-left: 1.5rem;
`

const Hr = styled.hr`
  border-top: ${({ theme }) =>
    theme.darkMode && '1px solid rgba(255,255,255,.1)'};
`

export { SearchResult }
