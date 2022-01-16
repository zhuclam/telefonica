import React, { ChangeEvent, useState, useEffect, useCallback } from 'react'
import { Container, Table, Button, Collapse, Input } from 'reactstrap'
import {
  Alert,
  Breadcrumb,
  Spinner,
  useAlerts,
  useConfirmationModal,
  ConfirmationModal,
  Switch,
} from 'components'
import { useConfig, useFetch } from 'hooks'
import styled, { css } from 'styled'
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
  const { territories, currentTerritory, updateTerritories, getConfigs } =
    useConfig()

  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [showNewTerritoryForm, setShowNewTerritoryForm] =
    useState<boolean>(false)

  const [hoveringId, setHoveringId] = useState<number>(0)
  const [editingName, setEditingName] =
    useState<{ id: number; name: string } | undefined>()

  const toggleNewTerritoryForm = () => setShowNewTerritoryForm((open) => !open)

  const [newName, setNewName] = useState<string>('')

  const Fetch = useFetch()
  const { AlertManager } = useAlerts()
  const {
    isModalOpen: isDeleteModalOpen,
    data: idToDelete,
    askEditConfirmation: askDeleteConfirmation,
    toggleModal: toggleDeleteModal,
    reset: resetDeleteModal,
  } = useConfirmationModal<number>()

  const {
    isModalOpen: isCampaignOffModalOpen,
    data: idToUpdate,
    askEditConfirmation: askCampaignOffconfirmation,
    toggleModal: toggleCampaignOffModal,
    reset: resetCampaignOffModal,
  } = useConfirmationModal<number>()

  const territoryToDelete =
    !!idToDelete && territories.find((t) => t.id === idToDelete)
  const territoryToUpdate =
    !!idToUpdate && territories.find((t) => t.id === idToUpdate)

  const buildTerritoryURL = (name: string) =>
    `${window.location.origin}/${name}/`

  const copyLink = (name: string) => {
    navigator.clipboard.writeText(buildTerritoryURL(name))
    AlertManager.show('copy-success')
  }

  const invalidEditingName = (editingName?.name ?? '').length === 0

  useEffect(() => {
    getConfigs(Fetch)
  }, [Fetch, getConfigs])

  const onCreateNew = async () => {
    if (newName.length === 0) return

    const encodedNewName = encodeURIComponent(newName)

    try {
      setIsCreatingNew(true)
      const [err, { territory }] = await Fetch().post<
        { name: string },
        { territory: Territory }
      >('/territories', {
        name: encodedNewName,
      })

      if (err) throw err

      updateTerritories(territories.concat(territory))
      AlertManager.show('new-success')
      setNewName('')
      setShowNewTerritoryForm(false)
    } catch {
      AlertManager.show('new-fail')
    } finally {
      setIsCreatingNew(false)
    }
  }

  const onDelete = async () => {
    if (idToDelete === null || !territoryToDelete) return

    try {
      setIsDeleting(true)
      const [err] = await Fetch().delete(`territories/${idToDelete}`)

      if (err) throw err

      const newTerritories = territories.filter((t) => t.id !== idToDelete)
      // Assuming territory at index 0 is always 'base'
      newTerritories[0].totalNumbers += territoryToDelete.totalNumbers
      updateTerritories(newTerritories)
      resetDeleteModal()
      AlertManager.show('delete-success')
    } catch {
      AlertManager.show('delete-fail')
    } finally {
      setIsDeleting(false)
    }
  }

  const onUpdate = useCallback(
    async (
      id: number,
      field: 'active' | 'campaignMode' | 'name' | 'public',
      newName?: string
    ) => {
      try {
        const territory = territories.find((t) => t.id === id)!
        if (!territory || (field === 'name' && !newName))
          throw new Error('onUpdate got wrong data')

        const newState =
          field === 'name' && newName
            ? encodeURIComponent(newName)
            : !territory[field]

        if (field === 'campaignMode' && newState === false)
          resetCampaignOffModal()

        const [err, { territory: updatedTerritory }] = await Fetch().put<
          Partial<Territory>,
          { territory: Territory }
        >(`territories/${id}`, { [field]: newState })

        if (err) throw err

        updateTerritories(
          territories.map((t) => (t.id === id ? updatedTerritory : t))
        )
        resetDeleteModal()
        AlertManager.show('update-success', { timeout: 1500 })
      } catch {
        AlertManager.show('update-fail')
      }
    },
    [
      AlertManager,
      Fetch,
      resetCampaignOffModal,
      resetDeleteModal,
      territories,
      updateTerritories,
    ]
  )

  useEffect(() => {
    const saveEditedName = (e: any) => {
      if (e.target?.id !== 'editing-input' && editingName) {
        onUpdate(editingName.id, 'name', editingName.name)
        setEditingName(undefined)
      }
    }
    document.addEventListener('click', saveEditedName)
    return () => document.removeEventListener('click', saveEditedName)
  }, [editingName, onUpdate])

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
      <Alert name="delete-success" position="top" variant="success">
        ¡Territorio eliminado!
      </Alert>
      <Alert name="delete-fail" position="top" variant="failure">
        No se pudo eliminar el territorio.
      </Alert>
      <Alert name="update-success" position="top" variant="success">
        Actualizado
      </Alert>
      <Alert name="update-fail" position="top" variant="failure">
        No se pudo actualizar el territorio.
      </Alert>
      <Container className="pt-3 mb-5">
        <Breadcrumb items={breadcrumbItems} />
        <hr />
        <h2 className="mb-4">Territorios</h2>
        <ul className="mb-4">
          <li>
            No se puede eliminar el primer territorio ni el actual seleccionado
          </li>
          <li>
            Los territorios privados solo pueden "desbloquearse" con el enlace
            de territorio, por dispositivo
          </li>
        </ul>
        <Button color="success" onClick={toggleNewTerritoryForm}>
          Nuevo
        </Button>
        <Collapse isOpen={showNewTerritoryForm}>
          <NewTerritoryForm>
            {isCreatingNew ? (
              <Spinner />
            ) : (
              <>
                <StyledInput
                  placeholder="Nombre"
                  value={newName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewName(e.target.value)
                  }
                />
                <Button
                  color="info"
                  onClick={onCreateNew}
                  disabled={newName.length === 0}
                >
                  Crear
                </Button>
              </>
            )}
          </NewTerritoryForm>
        </Collapse>
        <Table borderless responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Enlace</th>
              <th>En campaña</th>
              <th>Público</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {territories.map((territory) => (
              <tr key={territory.id}>
                <td
                  onMouseEnter={() => setHoveringId(territory.id)}
                  onMouseLeave={() => setHoveringId(0)}
                >
                  {editingName?.id === territory.id ? (
                    <StyledInput
                      id="editing-input"
                      value={editingName.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditingName({ ...editingName, name: e.target.value })
                      }
                      error={invalidEditingName}
                    />
                  ) : (
                    <>
                      {territory.name}
                      {hoveringId !== territory.id ? (
                        ` (${territory.totalNumbers})`
                      ) : (
                        <>
                          {' '}
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setImmediate(() =>
                                setEditingName({
                                  id: territory.id,
                                  name: territory.name,
                                })
                              )
                            }
                          >
                            ✏️
                          </span>
                        </>
                      )}
                    </>
                  )}
                </td>
                <ActiveCell active={!!territory.active}>
                  {territory.active ? 'Habilitado' : 'Deshabilitado'}
                </ActiveCell>
                <LinkTd>
                  <a href={buildTerritoryURL(territory.name)} target="_new">
                    {buildTerritoryURL(territory.name)}
                  </a>
                  <Button
                    color="secondary"
                    size="sm"
                    style={{ marginRight: '.5em', marginLeft: '.5em' }}
                    onClick={() => copyLink(territory.name)}
                  >
                    Copiar
                  </Button>
                </LinkTd>
                <CampaignCell
                  active={!!territory.campaignMode}
                  completed={territory.completed === 100}
                >
                  {territory.campaignMode
                    ? `Activa (${territory.completed}% completado)`
                    : 'No'}
                </CampaignCell>
                <td>
                  <Switch
                    id={territory.id.toString()}
                    checked={!!territory.public}
                    onChange={() => onUpdate(territory.id, 'public')}
                  />
                </td>
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    color={territory.active ? 'warning' : 'success'}
                    size="sm"
                    onClick={() => onUpdate(territory.id, 'active')}
                  >
                    {territory.active ? 'Deshabilitar' : 'Habilitar'}
                  </Button>
                  <Button
                    color={territory.campaignMode ? 'secondary' : 'info'}
                    size="sm"
                    style={{ marginLeft: '.5em' }}
                    onClick={
                      territory.campaignMode
                        ? () => askCampaignOffconfirmation(territory.id)
                        : () => onUpdate(territory.id, 'campaignMode')
                    }
                  >
                    {territory.campaignMode ? 'Desactivar' : 'Activar'} campaña
                  </Button>
                  <Button
                    style={{ marginLeft: '.5em' }}
                    color="danger "
                    size="sm"
                    onClick={() => askDeleteConfirmation(territory.id)}
                    disabled={
                      territory.id === currentTerritory.id || territory.id === 1
                    }
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {idToDelete !== null && territoryToDelete && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          toggleModal={toggleDeleteModal}
          onConfirm={onDelete}
          title="¡Advertencia!"
          body={
            isDeleting ? (
              <Spinner fulfill />
            ) : (
              <div>
                <p>
                  Al borrar un territorio, todos los números que tenga asignado
                  actualmente no serán borrados, sino que serán movidos al
                  territorio base.
                </p>
                <p>¿Seguro que desea eliminar el siguiente territorio?</p>
                <span className="d-block">
                  Nombre: {territoryToDelete.name}
                </span>
              </div>
            )
          }
          buttonColor="danger"
          confirmationLabel="Eliminar"
        />
      )}
      {idToUpdate !== null && territoryToUpdate && (
        <ConfirmationModal
          isOpen={isCampaignOffModalOpen}
          toggleModal={toggleCampaignOffModal}
          onConfirm={() => onUpdate(idToUpdate, 'campaignMode')}
          title="¡Advertencia!"
          body={
            <div>
              <p>
                Al desactivar la campaña de este territorio, la campaña se
                reinicirá a cero y se perderá todo el progreso actual.
              </p>
              <p>
                ¿Seguro que desea desactivar la campaña del siguiente
                territorio?
              </p>
              <span className="d-block">Nombre: {territoryToUpdate.name}</span>
            </div>
          }
          buttonColor="danger"
          confirmationLabel="Desactivar"
        />
      )}
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

const ActiveCell = styled.td<{ active: boolean; neutral?: boolean }>`
  color: ${({ active, theme, neutral }) =>
    active ? theme.text.colors.green : neutral ? '' : theme.text.colors.error};
`

const CampaignCell = styled.td<{ active: boolean; completed: boolean }>`
  color: ${({ active, theme, completed }) =>
    !active
      ? ''
      : completed
      ? theme.text.colors.green
      : theme.text.colors.yellow};
`

export { ManageTerritories }
