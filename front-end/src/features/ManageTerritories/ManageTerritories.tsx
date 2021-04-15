import React, { ChangeEvent, useState } from 'react'
import { Container, Table, Button, Collapse, Input } from 'reactstrap'
import { Alert, Breadcrumb, Spinner, useAlerts } from 'components'
import { useConfig, useFetch } from 'hooks'
import styled, { css } from 'styled-components'
import { Territory } from 'types'

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
  const { territories, currentTerritory, updateTerritories } = useConfig()

  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
  const [showNewTerritoryForm, setShowNewTerritoryForm] = useState<boolean>(
    false
  )

  const toggleNewTerritoryForm = () => setShowNewTerritoryForm((open) => !open)

  const [newName, setNewName] = useState<string>('')

  const Fetch = useFetch()
  const { AlertManager } = useAlerts()

  const buildTerritoryURL = (name: string) =>
    `${window.location.origin}/${name}/`

  const copyLink = (name: string) => {
    navigator.clipboard.writeText(buildTerritoryURL(name))
    AlertManager.show('copy-success')
  }

  const invalidNewName = /[^\w\d-]/i.test(newName)

  const onCreateNew = async () => {
    if (invalidNewName) return

    try {
      setIsCreatingNew(true)
      const [err, { territory }] = await Fetch().post<
        { name: string },
        { territory: Territory }
      >('/territories', {
        name: newName,
      })

      if (err) throw err

      updateTerritories(territories.concat(territory))
      AlertManager.show('new-success')
    } catch {
      AlertManager.show('new-fail')
    } finally {
      setIsCreatingNew(false)
    }
  }

  return (
    <>
      <Alert name="copy-success" position="top" variant="success">
        Enlace copiado al portapapeles
      </Alert>
      <Alert name="new-success" position="top" variant="success">
        ¡Territorio creado!
      </Alert>
      <Alert name="new-fail" position="top" variant="failure">
        No se pudo crear el territorio.
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
            {isCreatingNew ? (
              <Spinner />
            ) : (
              <>
                <StyledInput
                  placeholder="Nombre (solo se permiten letras, numeros y guiones)"
                  value={newName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewName(e.target.value)
                  }
                  error={invalidNewName}
                />
                <Button
                  color="info"
                  onClick={onCreateNew}
                  disabled={invalidNewName}
                >
                  Crear
                </Button>
              </>
            )}
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
          {territories.map((territory) => (
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
              <td>
                {territory.campaignMode ? 'Activa (45% completado)' : 'No'}
              </td>
              <td style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  color={territory.active ? 'warning' : 'success'}
                  size="sm"
                >
                  {territory.active ? 'Deshabilitar' : 'Habilitar'}
                </Button>
                <Button
                  color={territory.campaignMode ? 'secondary' : 'info'}
                  size="sm"
                  style={{ marginLeft: '.5em' }}
                >
                  {territory.campaignMode ? 'Desactivar' : 'Activar'} campaña
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
          ))}
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
  justify-content: center;

  button {
    margin-left: 0.5em;
  }
`

const StyledInput = styled(Input)<{ error?: boolean }>`
  ${({ error, theme }) =>
    error &&
    css`
      background-color: ${theme.text.colors.error} !important;
    `}
`

export { ManageTerritories }
