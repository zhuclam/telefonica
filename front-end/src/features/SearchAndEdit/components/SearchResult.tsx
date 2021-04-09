import React, { useCallback, useMemo, useState } from 'react'
import { Button, Table, Input } from 'reactstrap'
import styled from 'styled-components'
import { Phone } from 'types'

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

  return (
    <>
      <h3>
        Mostrando {entries.length} de {count} resultados.
      </h3>
      <hr />
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
  background: white;
  z-index: 1;

  button:not(:first-of-type) {
    margin-left: 1em;
  }
`

const Centered = styled.div`
  padding-left: 1.5rem;
`

export { SearchResult }
