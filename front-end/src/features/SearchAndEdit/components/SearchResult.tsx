import React from 'react'
import { Button, Table } from 'reactstrap'
import styled from 'styled-components'
import { Phone } from 'types'

interface SearchResultProps {
  entries: Phone[]
  onEditRequest: (phone: Phone) => void
  onDeleteRequest: (id: number) => void
}

const SearchResult: React.FC<SearchResultProps> = ({
  entries,
  onEditRequest,
  onDeleteRequest,
}) => (
  <>
    <h3>Resultados: {entries.length}</h3>
    <span className="text-secondary">
      * Se muestra un máximo de 100 números por búsqueda.
    </span>
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
          <tr>
            <td>{phone.id}</td>
            <PhoneCell>{phone.phone}</PhoneCell>
            <td>{phone.info}</td>
            <td>{phone.unansweredDate || phone.fulfilledOn || 'Nunca'}</td>
            <td>{phone.answeredOn || 'Nunca'}</td>
            <td>{phone.comments}</td>
            <td>{phone.postponedDays}</td>
            <td>
              {phone.noCall
                ? 'No visitar'
                : phone.nonExistent
                ? 'No existe'
                : phone.noWeekends
                ? 'No llamar'
                : '-'}
            </td>
            <ActionCell>
              <Button color="warning" onClick={() => onEditRequest(phone)}>
                Editar
              </Button>
              <Button color="danger" onClick={() => onDeleteRequest(phone.id)}>
                Borrar
              </Button>
            </ActionCell>
          </tr>
        ))}
      </Tbody>
    </Table>
  </>
)

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

export { SearchResult }
