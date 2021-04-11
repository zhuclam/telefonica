import React, { useState } from 'react'
import { Container, Table, Button, Collapse, Row, Col, Input } from 'reactstrap'
import { Alert, Breadcrumb, Spinner, useAlerts } from 'components'
import { useConfig, useFetch } from 'hooks'
import styled from 'styled-components'

const breadcrumbItems = [
  {
    title: 'Panel de Administración',
    linkTo: '/admin-panel',
  },
  {
    title: 'Gestionar territorios',
  },
]

const ManageTerritories: React.FC = () => {
  const { configurations, territories, currentTerritory } = useConfig()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showNewTerritoryForm, setShowNewTerritoryForm] = useState<boolean>(
    false
  )

  const toggleNewTerritoryForm = () => setShowNewTerritoryForm((open) => !open)

  const Fetch = useFetch()
  const { AlertManager } = useAlerts()

  const buildTerritoryURL = (name: string) =>
    `${window.location.origin}/${name}/`

  const copyLink = (name: string) => {
    navigator.clipboard.writeText(buildTerritoryURL(name))
    AlertManager.show('copy-success')
  }

  return (
    <>
      <Alert name="copy-success" position="top" variant="success">
        Enlace copiado al portapapeles
      </Alert>
      <Container className="pt-3 mb-5">
        <Breadcrumb items={breadcrumbItems} />
        <hr />
        <SpaceBetween>
          <h2>Territorios:</h2>
          <Button color="success" onClick={toggleNewTerritoryForm}>
            Nuevo
          </Button>
        </SpaceBetween>
        <Collapse isOpen={showNewTerritoryForm}>
          <NewTerritoryForm>
            <Input placeholder="Nombre" />
            <Button color="info">Crear</Button>
          </NewTerritoryForm>
        </Collapse>
        <p>(No se puede eliminar el territorio base ni el actual)</p>
        <Table borderless responsive>
          <thead>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Enlace</th>
            <th>Campaña</th>
            <th>Acciones</th>
          </thead>
          {territories.map((territory) => {
            const { campaignMode } = configurations.find(
              (c) => c.territoryId === territory.id
            )!
            return (
              <tr key={territory.id}>
                <td>{territory.name}</td>
                <td>{territory.active ? 'Habilitado' : 'Deshabilitado'}</td>
                <LinkTd>
                  <a href={buildTerritoryURL(territory.name)} target="_new">
                    {buildTerritoryURL(territory.name)}
                  </a>
                  <Button
                    color="secondary"
                    size="sm"
                    style={{ marginRight: '.5em' }}
                    onClick={() => copyLink(territory.name)}
                  >
                    Copiar
                  </Button>
                </LinkTd>
                <td>{campaignMode ? 'Activa (45% completado)' : 'No'}</td>
                <td>
                  <Button
                    color={territory.active ? 'warning' : 'success'}
                    size="sm"
                  >
                    {territory.active ? 'Deshabilitar' : 'Habilitar'}
                  </Button>
                  <Button
                    color={campaignMode ? 'secondary' : 'info'}
                    size="sm"
                    style={{ marginLeft: '.5em' }}
                  >
                    {campaignMode ? 'Desactivar' : 'Activar'} campaña
                  </Button>
                  <Button
                    style={{ marginLeft: '.5em' }}
                    color="danger "
                    size="sm"
                    disabled={
                      territory.id === currentTerritory.id || territory.id === 1
                    }
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            )
          })}
        </Table>
      </Container>
    </>
  )
}

const LinkTd = styled.td`
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    max-width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const NewTerritoryForm = styled.div`
  display: flex;
  margin: 1em 0;

  button {
    margin-left: 0.5em;
  }
`

export { ManageTerritories }
